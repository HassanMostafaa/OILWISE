import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { query } from "../../_generated/server";
import { getAuthenticatedUser } from "../../auth/getAuthenticatedUser";

export const getMyNumberById = query({
  args: {
    id: v.id("numbers"),
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    const number = await ctx.db.get(args.id);

    if (!number) {
      throw new Error("Number not found");
    }

    if (number.userId !== user._id) {
      throw new Error("Not authorized");
    }

    return number;
  },
});

export const getMyNumbers = query({
  args: {},

  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);

    return ctx.db
      .query("numbers")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

export const getMyNumbersPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    return ctx.db
      .query("numbers")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
