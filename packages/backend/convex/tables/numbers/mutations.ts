import { numbers } from "./table";
import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export const insertNumber = mutation({
  args: {
    value: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("numbers", args);
  },
});

export const deleteNumberById = mutation({
  args: {
    id: v.id("numbers"),
  },
  handler: async (ctx, args) => {
    const numberToDelete = await ctx.db.get(args.id);
    if (!numberToDelete) {
      return {
        success: false,
        message: "Object with that id not found",
      };
    }

    await ctx.db.delete(args.id);

    const isNotDeleted = await ctx.db.get(args.id);
    if (isNotDeleted) {
      return {
        success: false,
        message: "Delete execution failed to remove value from database",
      };
    } else {
      return {
        success: true,
        message: "",
        deletedValue: numberToDelete,
      };
    }
  },
});
