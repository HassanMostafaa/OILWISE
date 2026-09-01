import { v } from "convex/values";
import { query } from "../../_generated/server";

import { getAuthenticatedUser } from "../../auth/getAuthenticatedUser";

export const getPushSubscriptionStatus = query({
  args: {
    browserId: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    const subscription = await ctx.db
      .query("pushAlertsSubscriptions")
      .withIndex("by_browser_id_and_user_id_and_active", (q) =>
        q
          .eq("browserId", args.browserId)
          .eq("userId", user._id)
          .eq("active", true),
      )
      .unique();

    return {
      user,
      isSubscribed: !!subscription,
      subscription,
    };
  },
});
