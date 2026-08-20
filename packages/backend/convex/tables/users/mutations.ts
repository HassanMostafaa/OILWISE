import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },

  handler: async (ctx, args) => {
    return ctx.db.insert("users", args);
  },
});

export const deleteUserById = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (context, args) => {
    return context.db.delete(args.userId);
  },
});
