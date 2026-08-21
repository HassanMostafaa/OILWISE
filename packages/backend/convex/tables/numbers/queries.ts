import { numbers } from "./table";
import { v } from "convex/values";
import { query } from "../../_generated/server";

export const getNumberValueById = query({
  args: {
    id: v.id("numbers"),
  },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});

export const getAllNumbers = query({
  handler: async (ctx) => {
    return ctx.db.query("numbers").collect();
  },
});
