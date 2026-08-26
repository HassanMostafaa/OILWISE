"use client";

import { api } from "@oilwise-v1/backend/convex/_generated/api";
import { useMutation } from "convex/react";

// args
// endpoint
// enabled
export const useUpdatePushSubscriptionService = () => {
  return useMutation(
    api.notifications.subscriptions.mutations.updatePushSubscriptionEnabled,
  );
};
