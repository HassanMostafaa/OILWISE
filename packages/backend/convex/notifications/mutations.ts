import { metadata } from "./../../../../apps/web/app/layout";
import { v } from "convex/values";
import { internalMutation, mutation } from "../_generated/server";
import { getAuthenticatedUser } from "../auth/getAuthenticatedUser";
import { notifications } from "./client";
export const sendNotification = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
  },

  handler: async (ctx, args) => {
    const admin = await getAuthenticatedUser(ctx);

    if (admin.role !== "admin") {
      throw new Error("Unauthorized");
    }

    return notifications.create(ctx, {
      targetId: args.userId,
      kind: "mileage_reminder",
      data: {
        title: args.title,
        mileage: 1,
        userId: args.userId,
      },
    });
  },
});

export const sendNotificationInternal = internalMutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
  },

  handler: async (ctx, args) => {
    return notifications.create(ctx, {
      targetId: args.userId,
      kind: "mileage_reminder",
      data: {
        title: `INTERNAL: ${args.title}`,
        mileage: 1,
        userId: args.userId,
        message: args.message,
      },
    });
  },
});
