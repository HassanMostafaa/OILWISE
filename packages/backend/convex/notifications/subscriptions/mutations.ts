import { mutation } from "../../_generated/server";
import { v } from "convex/values";

import { getAuthenticatedUser } from "../../auth/getAuthenticatedUser";

export const savePushSubscription = mutation({
  args: {
    endpoint: v.string(),
    p256dh: v.string(),
    auth: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    const existingSubscription = await ctx.db
      .query("pushSubscriptions")
      .withIndex("by_endpoint", (q) => q.eq("endpoint", args.endpoint))
      .unique();

    if (existingSubscription) {
      await ctx.db.patch(existingSubscription._id, {
        userId: user._id,
        p256dh: args.p256dh,
        auth: args.auth,
        enabled: true, // ← add it here
      });

      return existingSubscription._id;
    }

    return ctx.db.insert("pushSubscriptions", {
      userId: user._id,
      endpoint: args.endpoint,
      p256dh: args.p256dh,
      auth: args.auth,
      enabled: true,
    });
  },
});

export const deletePushSubscription = mutation({
  args: {
    endpoint: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    const subscription = await ctx.db
      .query("pushSubscriptions")
      .withIndex("by_endpoint", (q) => q.eq("endpoint", args.endpoint))
      .unique();

    if (!subscription) return;

    if (subscription.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(subscription._id);
  },
});

export const updatePushSubscriptionEnabled = mutation({
  args: {
    endpoint: v.string(),
    enabled: v.boolean(),
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    const subscription = await ctx.db
      .query("pushSubscriptions")
      .withIndex("by_user_id_and_endpoint", (q) =>
        q.eq("userId", user._id).eq("endpoint", args.endpoint),
      )
      .unique();

    if (!subscription) {
      return {
        success: false,
        enabled: null,
      };
    }

    await ctx.db.patch(subscription._id, {
      enabled: args.enabled,
    });

    return {
      success: true,
      enabled: args.enabled,
    };
  },
});
