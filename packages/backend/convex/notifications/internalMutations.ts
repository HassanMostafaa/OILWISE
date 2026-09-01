// packages/backend/convex/notifications/internalMutations.ts
import { internalMutation } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import { notificationAction, notifications } from "./client";

export const sendNotificationInternal = internalMutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
    action: notificationAction,
  },

  handler: async (ctx, args) => {
    const targetUser = await ctx.db.get(args.userId);

    if (!targetUser) {
      throw new Error("Target user not found");
    }

    const notificationId = await notifications.create(ctx, {
      targetId: targetUser.clerkUserId,
      kind: "reminder",

      data: {
        title: args.title,
        message: args.message,
        mileage: 9999999,
        userId: targetUser._id,
        action: args.action,
      },
    });

    const activeSubscriptions = await ctx.db
      .query("pushAlertsSubscriptions")
      .withIndex("by_user_id_and_active", (q) =>
        q.eq("userId", targetUser._id).eq("active", true),
      )
      .collect();

    const hasBrowserPush = activeSubscriptions.length > 0;

    if (hasBrowserPush) {
      await ctx.scheduler.runAfter(
        0,
        internal.notifications.actions.sendPushNotification,
        {
          userId: targetUser._id,
          title: args.title,
          message: args.message,
          action: args.action,
        },
      );
    }

    return {
      notificationId,
      delivery: {
        inApp: true,
        browserPush: {
          available: hasBrowserPush,
          subscriptionCount: activeSubscriptions.length,
          scheduled: hasBrowserPush,
        },
      },
    };
  },
});
