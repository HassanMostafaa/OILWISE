import type { GenericQueryCtx } from "convex/server";
import type { DataModel } from "../_generated/dataModel";

type AuthContext = Pick<GenericQueryCtx<DataModel>, "auth" | "db">;

export const getAuthenticatedUser = async (ctx: AuthContext) => {
  const identity = await ctx.auth.getUserIdentity();

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
