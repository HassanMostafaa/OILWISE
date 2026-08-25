// providers/NotificationToastSync.tsx

"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useConvexAuth, useQuery } from "convex/react";

import { api } from "@oilwise-v1/backend/convex/_generated/api";

export const NotificationToastSync = () => {
  const { isAuthenticated } = useConvexAuth();

  const notifications = useQuery(
    api.notifications.list,
    isAuthenticated ? {} : "skip",
  );

  const initialized = useRef(false);
  const seenNotifications = useRef(new Set<string>());

  useEffect(() => {
    if (!notifications) return;

    const getNotificationKey = (notification: unknown) =>
      JSON.stringify(notification);

    // Initial load:
    // remember existing notifications without showing old toasts.
    if (!initialized.current) {
      notifications.forEach((notification) => {
        seenNotifications.current.add(getNotificationKey(notification));
      });

      initialized.current = true;
      return;
    }

    notifications.forEach((notification) => {
      const key = getNotificationKey(notification);

      if (seenNotifications.current.has(key)) return;

      seenNotifications.current.add(key);

      toast.info(notification.data.title, {
        description: notification.data.message,
      });
    });
  }, [notifications]);

  return null;
};
