import { defineTable } from "convex/server";
import { v } from "convex/values";

export const users = defineTable({
  name: v.string(),
  email: v.string(),
}).index("by_email", ["email"]);
