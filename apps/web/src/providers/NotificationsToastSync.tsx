"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useConvexAuth, useQuery } from "convex/react";

import { api } from "@oilwise-v1/backend/convex/_generated/api";

export const NotificationToastSync = () => {
  const { userId } = useAuth();
  const { isAuthenticated } = useConvexAuth();

  const notifications = useQuery(
    api.notifications.list,
    isAuthenticated ? {} : "skip",
  );

  const initialized = useRef(false);
  const seenNotifications = useRef(new Set<string>());

  // New account = new baseline
  useEffect(() => {
    initialized.current = false;
    seenNotifications.current.clear();
  }, [userId]);

  useEffect(() => {
    if (!notifications || !userId) return;

    // First load for this user:
    // remember everything without showing toasts.
    if (!initialized.current) {
      notifications.forEach((notification) => {
        seenNotifications.current.add(notification._id);
      });

      initialized.current = true;
      return;
    }

    // Subsequent updates:
    // only toast notifications we haven't seen before.
    notifications.forEach((notification) => {
      if (seenNotifications.current.has(notification._id)) {
        return;
      }

      seenNotifications.current.add(notification._id);

      toast.info(notification.data.title, {
        description: notification.data.message,
      });
    });
  }, [notifications, userId]);

  return null;
};
