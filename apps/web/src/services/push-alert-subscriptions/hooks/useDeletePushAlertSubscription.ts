"use client";

import { api } from "@oilwise-v1/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export const useDeletePushAlertSubscription = () => {
  return useMutation(
    api.tables.push_alerts_subscriptions.mutations.deletePushAlertSubscription,
  );
};
