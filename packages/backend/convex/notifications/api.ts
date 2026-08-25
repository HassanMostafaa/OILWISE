import { makeNotificationAPI } from "convex-notification/server";
import { notifications } from "./client";
import { getAuthenticatedUser } from "../auth/getAuthenticatedUser";

export const userNotifications = makeNotificationAPI(notifications, {
  resolveTargetId: async (ctx) => {
    const user = await getAuthenticatedUser(ctx as any);

    return user._id;
  },
});
