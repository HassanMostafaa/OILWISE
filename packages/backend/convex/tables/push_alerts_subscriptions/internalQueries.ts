import { v } from "convex/values";
import { Doc } from "../../_generated/dataModel";
import { internalQuery } from "../../_generated/server";

export const getActiveSubscriptionsByUserId = internalQuery({
  args: {
    userId: v.id("users"),
  },

  handler: async (ctx, args) => {
    return ctx.db
      .query("pushAlertsSubscriptions")
      .withIndex("by_user_id_and_active", (q) =>
        q.eq("userId", args.userId).eq("active", true),
      )
      .collect();
  },
});
