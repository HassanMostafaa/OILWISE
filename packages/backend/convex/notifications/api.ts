import { makeNotificationAPI } from "convex-notification/server";

import { notifications } from "./client";

export const userNotifications = makeNotificationAPI(notifications, {
  resolveTargetId: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    return identity.subject;
  },
});
