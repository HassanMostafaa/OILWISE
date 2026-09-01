"use client";

import moment from "moment";
import { useMutation } from "convex/react";
import { api } from "@oilwise-v1/backend/convex/_generated/api";
import type { FunctionReturnType } from "convex/server";

type Notification = FunctionReturnType<typeof api.notifications.list>[number];

const formatDate = (timestamp?: number) => {
  if (!timestamp) return "—";

  return moment(timestamp).format("MMM D, YYYY • h:mm:ss A");
};

export const NotificationCard = (notification: Notification) => {
  const markSeen = useMutation(api.notifications.markSeen);
  const dismiss = useMutation(api.notifications.dismiss);

  return (
    <article>
      <p>{notification.kind}</p>
      <p>{notification.isSeen ? "Seen" : "Unseen"}</p>

      <h3>Title: {notification.data.title ?? "Untitled notification"}</h3>

      <p>Message: {notification.data.message ?? "No message"}</p>

      {/* <p>{notification.isDismissed ? "Dismissed" : "Active"}</p> */}

      <p>Notification ID: {notification._id}</p>

      <p>Target ID: {notification.targetId}</p>

      <p>User ID: {notification.data.userId}</p>

      <p>Sequence: {notification.sequence}</p>

      <p>Mileage: {notification.data.mileage ?? "—"}</p>

      <p>Created: {formatDate(notification.createdAt)}</p>

      <p>Updated: {formatDate(notification.updatedAt)}</p>

      <p>Seen At: {formatDate(notification.seenAt)}</p>

      {!notification.isSeen && (
        <button
          type="button"
          onClick={() =>
            markSeen({
              notificationId: notification._id,
            })
          }
        >
          Mark as seen
        </button>
      )}

      {!notification.isDismissed && (
        <button
          type="button"
          onClick={() =>
            dismiss({
              notificationId: notification._id,
            })
          }
        >
          Dismiss
        </button>
      )}

      {notification.data.action?.label && notification.data.action.href && (
        <a href={notification.data.action.href}>
          <button>{notification.data.action.label}</button>
        </a>
      )}
    </article>
  );
};
