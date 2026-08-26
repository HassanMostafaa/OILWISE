import { v } from "convex/values";
import type { Doc } from "../_generated/dataModel";
import { internalQuery } from "../_generated/server";

export const getSubscriptionsByUserId = internalQuery({
  args: {
    userId: v.id("users"),
  },

  handler: async (
    ctx,
    args,
  ): Promise<Doc<"pushNotificationsSubscriptions">[]> => {
    return ctx.db
      .query("pushNotificationsSubscriptions")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();
  },
});
