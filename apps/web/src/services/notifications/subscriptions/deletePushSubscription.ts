"use client";

import { useMutation } from "convex/react";
import { api } from "@oilwise-v1/backend/convex/_generated/api";

//   args: {
// endpoint: v.string(),
// },

export const useDeletePushSubscription = () => {
  return useMutation(
    api.notifications.subscriptions.mutations.deletePushSubscription,
  );
};
