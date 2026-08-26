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
      .query("pushNotificationsSubscriptions")
      .withIndex("by_endpoint", (q) => q.eq("endpoint", args.endpoint))
      .unique();

    if (existingSubscription) {
      await ctx.db.patch(existingSubscription._id, {
        userId: user._id,
        p256dh: args.p256dh,
        auth: args.auth,
      });

      return existingSubscription._id;
    }

    return ctx.db.insert("pushNotificationsSubscriptions", {
      userId: user._id,
      endpoint: args.endpoint,
      p256dh: args.p256dh,
      auth: args.auth,
    });
  },
});
