import { defineTable } from "convex/server";
import { v } from "convex/values";

export const pushSubscriptions = defineTable({
  userId: v.id("users"),
  endpoint: v.string(),
  p256dh: v.string(),
  auth: v.string(),
  enabled: v.boolean(),
})
  .index("by_user_id", ["userId"])
  .index("by_endpoint", ["endpoint"])
  .index("by_user_id_and_endpoint", ["userId", "endpoint"]);
