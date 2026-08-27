"use client";

import moment from "moment";
import { useMutation } from "convex/react";
import { api } from "@oilwise-v1/backend/convex/_generated/api";
import { FunctionReturnType } from "convex/server";

type INotification = FunctionReturnType<typeof api.notifications.list>[number];

const formatDate = (timestamp?: number) => {
  if (!timestamp) return "—";

  return moment(timestamp).format("MMM D, YYYY • h:mm:ss A");
};

const Value = ({ children }: { children: React.ReactNode }) => (
  <span className="break-all text-sm text-gray-400">{children ?? "—"}</span>
);

export const NotificationCard = (notification: INotification) => {
  const markSeen = useMutation(api.notifications.markSeen);
  const dismiss = useMutation(api.notifications.dismiss);

  const handleMarkSeen = async () => {
    await markSeen({
      notificationId: notification._id,
    });
  };

  const handleDismiss = async () => {
    await dismiss({
      notificationId: notification._id,
    });
  };

  return (
    <article className="border space-y-6 p-5 bg-gray-900 flex-1 min-w-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-gray-500">{notification.kind}</p>

          <h3 className="font-semibold">
            {notification.data.title ?? "Untitled notification"}
          </h3>

          <p className="text-sm text-gray-500">
            {notification.data.message ?? "No message"}
          </p>
        </div>

        <div className="flex gap-2">
          <span className="rounded-full border px-2 py-1 text-xs">
            {notification.isSeen ? "Seen" : "Unseen"}
          </span>

          <span className="rounded-full border px-2 py-1 text-xs">
            {notification.isDismissed ? "Dismissed" : "Active"}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-stretch justify-between gap-2">
        <Field label="Notification ID">
          <Value>{notification._id}</Value>
        </Field>

        <Field label="Target ID">
          <Value>{notification.targetId}</Value>
        </Field>

        <Field label="User ID">
          <Value>{notification.data.userId}</Value>
        </Field>

        <Field label="Sequence">
          <Value>{notification.sequence}</Value>
        </Field>

        <Field label="Mileage">
          <Value>
            {notification.data.mileage !== undefined
              ? notification.data.mileage
              : "—"}
          </Value>
        </Field>

        <Field label="Created">
          <Value>{formatDate(notification.createdAt)}</Value>
        </Field>

        <Field label="Updated">
          <Value>{formatDate(notification.updatedAt)}</Value>
        </Field>

        <Field label="Seen At">
          <Value>{formatDate(notification.seenAt)}</Value>
        </Field>
      </div>

      <div className="flex gap-2 border-t pt-3">
        {!notification.isSeen && (
          <button
            type="button"
            className="rounded-md border px-3 py-2 text-sm"
            onClick={handleMarkSeen}
          >
            Mark as seen
          </button>
        )}

        {!notification.isDismissed && (
          <button
            type="button"
            className="rounded-md border px-3 py-2 text-sm"
            onClick={handleDismiss}
          >
            Dismiss
          </button>
        )}
        {notification.data?.action?.label && (
          <a
            href={notification.data.action.href}
            className="rounded-md border px-3 py-2 text-sm"
          >
            {notification.data.action.label}
          </a>
        )}
      </div>
    </article>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-w-fit h-full flex-1 space-y-1 rounded-md p-2 outline">
      <p className="text-xs font-medium uppercase text-gray-200">{label}</p>

      {children}
    </div>
  );
};
