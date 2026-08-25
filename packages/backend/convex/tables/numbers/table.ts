import { defineTable } from "convex/server";
import { v } from "convex/values";

export const numbers = defineTable({
  value: v.optional(v.string()),
  userId: v.id("users"),
}).index("by_user_id", ["userId"]);
