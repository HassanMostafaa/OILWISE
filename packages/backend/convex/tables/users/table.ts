import { defineTable } from "convex/server";
import { v } from "convex/values";

export const users = defineTable({
  clerkUserId: v.string(),
  name: v.string(),
  email: v.string(),
  password: v.string(),
}).index("by_clerk_user_id", ["clerkUserId"]);
