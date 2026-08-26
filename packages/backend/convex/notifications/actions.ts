"use node";

import webpush from "web-push";
import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";

export const sendTestPush = action({
  args: {
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
  },

  handler: async (
    ctx,
    args,
  ): Promise<{
    subscriptionsFound: number;
    results: Array<{
      endpoint: string;
      success: boolean;
      statusCode?: number;
      error?: string;
    }>;
  }> => {
    const subject = process.env.VAPID_SUBJECT;
    const publicKey = process.env.VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;

    if (!subject || !publicKey || !privateKey) {
      throw new Error("Missing VAPID configuration");
    }

    webpush.setVapidDetails(subject, publicKey, privateKey);

    const subscriptions = await ctx.runQuery(
      internal.notifications.internalQueries.getSubscriptionsByUserId,
      {
        userId: args.userId,
      },
    );

    console.log("subscriptions found", subscriptions.length);

    const payload = JSON.stringify({
      title: args.title,
      body: args.message,
      url: "/",
    });

    const results = await Promise.all(
      subscriptions.map(async (subscription) => {
        try {
          const response = await webpush.sendNotification(
            {
              endpoint: subscription.endpoint,
              keys: {
                p256dh: subscription.p256dh,
                auth: subscription.auth,
              },
            },
            payload,
          );

          console.log("push success", {
            endpoint: subscription.endpoint,
            statusCode: response.statusCode,
          });

          return {
            endpoint: subscription.endpoint,
            success: true,
            statusCode: response.statusCode,
          };
        } catch (error) {
          console.error("push failed", error);

          return {
            endpoint: subscription.endpoint,
            success: false,
            statusCode:
              error instanceof webpush.WebPushError
                ? error.statusCode
                : undefined,
            error:
              error instanceof Error ? error.message : "Unknown push error",
          };
        }
      }),
    );

    return {
      subscriptionsFound: subscriptions.length,
      results,
    };
  },
});
