import type { QueryCtx, MutationCtx } from "../_generated/server";

type AuthContext = QueryCtx | MutationCtx;

export const getAuthenticatedUser = async (ctx: AuthContext) => {
  const identity = await ctx.auth.getUserIdentity();

  console.log({ identity });

  if (!identity) {
    throw new Error("Not authenticated");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", identity.subject))
    .unique();

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
