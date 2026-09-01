import { mutation } from "../../_generated/server";
import { v } from "convex/values";

import { getAuthenticatedUser } from "../../auth/getAuthenticatedUser";

const pushSubscriptionValidator = v.object({
  endpoint: v.optional(v.string()),
  expirationTime: v.optional(v.union(v.number(), v.null())),
  keys: v.optional(v.record(v.string(), v.string())),
});

export const savePushAlertSubscription = mutation({
  args: {
    browserId: v.string(),
    subscription: pushSubscriptionValidator,
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    const p256dh = args.subscription.keys?.p256dh;
    const auth = args.subscription.keys?.auth;

    if (!p256dh || !auth) {
      throw new Error("Invalid push subscription keys");
    }

    const subscription = {
      endpoint: args.subscription.endpoint,
      expirationTime: args.subscription.expirationTime,
      keys: {
        p256dh,
        auth,
      },
    };

    const existingSubscription = await ctx.db
      .query("pushAlertsSubscriptions")
      .withIndex("by_browser_id_and_user_id", (q) =>
        q.eq("browserId", args.browserId).eq("userId", user._id),
      )
      .unique();

    if (existingSubscription) {
      await ctx.db.patch(existingSubscription._id, {
        subscription,
        active: true,
      });

      return existingSubscription._id;
    }

    return ctx.db.insert("pushAlertsSubscriptions", {
      browserId: args.browserId,
      userId: user._id,
      active: true,
      subscription,
    });
  },
});

export const deletePushAlertSubscription = mutation({
  args: {
    browserId: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    const subscription = await ctx.db
      .query("pushAlertsSubscriptions")
      .withIndex("by_browser_id_and_user_id", (q) =>
        q.eq("browserId", args.browserId).eq("userId", user._id),
      )
      .unique();

    if (!subscription) return;

    await ctx.db.delete(subscription._id);
  },
});
export const updatePushAlertsActiveState = mutation({
  args: {
    browserId: v.string(),
    active: v.boolean(),

    subscription: v.optional(
      v.object({
        endpoint: v.optional(v.string()),
        expirationTime: v.optional(v.union(v.number(), v.null())),
        keys: v.optional(v.record(v.string(), v.string())),
      }),
    ),
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    const existingSubscription = await ctx.db
      .query("pushAlertsSubscriptions")
      .withIndex("by_browser_id_and_user_id", (q) =>
        q.eq("browserId", args.browserId).eq("userId", user._id),
      )
      .unique();

    if (!existingSubscription) return;

    if (!args.subscription) {
      await ctx.db.patch(existingSubscription._id, {
        active: args.active,
      });

      return;
    }

    const endpoint = args.subscription.endpoint;
    const p256dh = args.subscription.keys?.p256dh;
    const auth = args.subscription.keys?.auth;

    if (!endpoint || !p256dh || !auth) {
      throw new Error("Invalid push subscription");
    }

    await ctx.db.patch(existingSubscription._id, {
      active: args.active,

      subscription: {
        endpoint,
        expirationTime: args.subscription.expirationTime,
        keys: {
          p256dh,
          auth,
        },
      },
    });
  },
});
