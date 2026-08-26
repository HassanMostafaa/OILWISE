import { defineTable } from "convex/server";
import { v } from "convex/values";

export const pushNotificationsSubscriptions = defineTable({
  userId: v.id("users"),

  endpoint: v.string(),
  p256dh: v.string(),
  auth: v.string(),
})
  .index("by_user_id", ["userId"])
  .index("by_endpoint", ["endpoint"]);
