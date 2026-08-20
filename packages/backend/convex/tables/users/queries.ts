import { v } from "convex/values";
import { query } from "../../_generated/server";

export const getAllUsers = query({
  handler: async (ctx) => {
    return ctx?.db?.query("users")?.collect();
  },
});

export const getUserById = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, arg) => {
    return ctx.db.get(arg.userId);
  },
});
