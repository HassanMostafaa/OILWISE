import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export const registerUserProfile = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    console.log({ identity });

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) =>
        q.eq("clerkUserId", identity.subject),
      )
      .unique();

    if (existingUser) {
      throw new Error("User profile already exists");
    }

    return ctx.db.insert("users", {
      clerkUserId: identity.subject,
      name: args.name,
      email: args.email,
      password: "****",
    });
  },
});

// export const deleteUserById = mutation({
//   args: {
//     userId: v.id("users"),
//   },
//   handler: async (context, args) => {
//     return context.db.delete(args.userId);
//   },
// });
