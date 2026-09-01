import { defineTable } from "convex/server";
import { v } from "convex/values";

export const pushAlertsSubscriptions = defineTable({
  browserId: v.string(),
  userId: v.id("users"),
  active: v.boolean(),

  subscription: v.optional(
    v.object({
      endpoint: v.optional(v.string()),
      expirationTime: v.optional(v.union(v.number(), v.null())),
      keys: v.optional(v.record(v.string(), v.string())),
    }),
  ),
})
  .index("by_browser_id_and_user_id", ["browserId", "userId"])
  .index("by_browser_id_and_user_id_and_active", [
    "browserId",
    "userId",
    "active",
  ])
  .index("by_user_id_and_active", ["userId", "active"]);
