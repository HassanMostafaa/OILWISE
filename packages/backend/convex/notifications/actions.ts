"use node";

import webpush from "web-push";

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";

import { notificationAction } from "./client";

export const sendPushNotification = internalAction({
  args: {
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
    action: notificationAction,
  },

  handler: async (
    ctx,
    args,
  ): Promise<{
    sent: number;
    failed: number;
  }> => {
    const subject = process.env.VAPID_SUBJECT;
    const publicKey = process.env.VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;

    if (!subject || !publicKey || !privateKey) {
      throw new Error("Missing VAPID configuration");
    }

    webpush.setVapidDetails(subject, publicKey, privateKey);

    const activeSubscriptions = await ctx.runQuery(
      internal.tables.push_alerts_subscriptions.internalQueries
        .getActiveSubscriptionsByUserId,
      {
        userId: args.userId,
      },
    );

    const payload = JSON.stringify({
      title: args.title,
      body: args.message,
      action: args.action,
    });

    const results = await Promise.allSettled(
      activeSubscriptions.map(({ subscription }) =>
        webpush.sendNotification(
          {
            endpoint: subscription?.endpoint ?? "",
            keys: {
              p256dh: subscription?.keys?.p256dh ?? "",
              auth: subscription?.keys?.auth ?? "",
            },
          },
          payload,
        ),
      ),
    );

    return {
      sent: results.filter((result) => result.status === "fulfilled").length,

      failed: results.filter((result) => result.status === "rejected").length,
    };
  },
});
