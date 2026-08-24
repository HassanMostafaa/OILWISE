import { defineTable } from "convex/server";
import { v } from "convex/values";

export const users = defineTable({
  clerkUserId: v.string(),
  username: v.string(),
  email: v.string(),
  name: v.optional(v.string()),
  has_img: v.optional(v.boolean()),
  img_url: v.optional(v.string()),
}).index("by_clerk_user_id", ["clerkUserId"]);
