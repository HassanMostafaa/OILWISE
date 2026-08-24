import { mutation } from "../../_generated/server";
import { v } from "convex/values";

import { getAuthenticatedUser } from "../../auth/getAuthenticatedUser";

export const insertNumber = mutation({
  args: {
    value: v.number(),
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    return ctx.db.insert("numbers", {
      value: args.value,
      userId: user._id,
    });
  },
});

export const deleteNumberById = mutation({
  args: {
    id: v.id("numbers"),
  },

  handler: async (ctx, args) => {
    const user = await getAuthenticatedUser(ctx);

    const numberToDelete = await ctx.db.get(args.id);

    if (!numberToDelete) {
      return {
        success: false,
        message: "Number not found",
      };
    }

    if (numberToDelete.userId !== user._id) {
      return {
        success: false,
        message: "User not authorized to delete that number",
      };
    }

    await ctx.db.delete(args.id);

    return {
      success: true,
      message: "",
      deletedValue: numberToDelete,
    };
  },
});
