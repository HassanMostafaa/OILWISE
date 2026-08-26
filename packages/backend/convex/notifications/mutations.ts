import { mutation } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";

// import { getAuthenticatedUser } from "../auth/getAuthenticatedUser";
import { notificationAction, notifications } from "./client";

export const sendNotification = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
    action: notificationAction,
  },

  handler: async (ctx, args) => {
    // const sender = await getAuthenticatedUser(ctx);

    // if (sender.role !== "admin") {
    //   throw new Error("Unauthorized");
    // }

    const targetUser = await ctx.db.get(args.userId);

    if (!targetUser) {
      throw new Error("Target user not found");
    }

    // 1. Create the in-app notification.
    const notificationId = await notifications.create(ctx, {
      // Keep this aligned with whatever resolveTargetId()
      // uses in notifications/api.ts.
      targetId: targetUser.clerkUserId,

      kind: "mileage_reminder",

      data: {
        title: args.title,
        message: args.message,
        mileage: 1,
        userId: targetUser._id,

        action: args.action,
      },
    });

    // 2. Find browser subscriptions.
    const subscriptions = await ctx.db
      .query("pushSubscriptions")
      .withIndex("by_user_id_and_enabled", (q) =>
        q.eq("userId", targetUser._id).eq("enabled", true),
      )
      .collect();

    const hasBrowserPush = subscriptions.length > 0;

    // 3. Browser push is optional.
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
          subscriptionCount: subscriptions.length,
          scheduled: hasBrowserPush,
        },
      },
    };
  },
});
