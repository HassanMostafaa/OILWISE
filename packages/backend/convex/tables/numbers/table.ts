import { defineTable } from "convex/server";
import { v } from "convex/values";

export const numbers = defineTable({
  value: v.number(),
  userId: v.id("users"),
}).index("by_user_id", ["userId"]);
