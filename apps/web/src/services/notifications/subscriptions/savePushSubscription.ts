"use client";

import { useMutation } from "convex/react";
import { api } from "@oilwise-v1/backend/convex/_generated/api";

export const useSavePushSubscription = () => {
  return useMutation(
    api.notifications.subscriptions.mutations.savePushSubscription,
  );
};
