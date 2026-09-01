// packages/backend/convex/notifications/mutations.ts

import { v } from "convex/values";

import { mutation } from "../_generated/server";
import { internal } from "../_generated/api";
import { notificationAction } from "./client";

type SendNotificationResult = {
  notificationId: unknown;
  delivery: {
    inApp: boolean;
    browserPush: {
      available: boolean;
      subscriptionCount: number;
      scheduled: boolean;
    };
  };
};

export const sendNotification = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
    action: notificationAction,
  },

  handler: async (ctx, args): Promise<SendNotificationResult> => {
    return ctx.runMutation(
      internal.notifications.internalMutations.sendNotificationInternal,
      args,
    );
  },
});

export const scheduleNotification = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
    action: notificationAction,
    scheduledAt: v.number(),
  },

  handler: async (ctx, args): Promise<string> => {
    const { scheduledAt, ...notification } = args;

    return ctx.scheduler.runAt(
      scheduledAt,
      internal.notifications.internalMutations.sendNotificationInternal,
      notification,
    );
  },
});
