import { internalQuery } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";
import { v } from "convex/values";

export const getSubscriptionsByUserId = internalQuery({
  args: {
    userId: v.id("users"),
  },

  handler: async (ctx, args): Promise<Doc<"pushSubscriptions">[]> => {
    return ctx.db
      .query("pushSubscriptions")
      .withIndex("by_user_id_and_enabled", (q) =>
        q.eq("userId", args.userId).eq("enabled", true),
      )
      .collect();
  },
});
