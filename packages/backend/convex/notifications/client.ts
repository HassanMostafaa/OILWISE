import { v } from "convex/values";
import { components } from "../_generated/api";
import { defineNotifications } from "convex-notification";

export const notificationAction = v.optional(
  v.object({
    label: v.optional(v.string()),
    href: v.string(),
  }),
);

export const notifications = defineNotifications(components.notification, {
  kinds: {
    mileage_reminder: v.object({
      title: v.string(),
      userId: v.id("users"),
      mileage: v.number(),
      message: v.optional(v.string()),
      action: notificationAction,
    }),

    admin_broadcast: v.object({
      title: v.string(),
      message: v.string(),
      action: notificationAction,
    }),
  },
});
