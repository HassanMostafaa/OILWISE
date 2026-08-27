import { api } from "@oilwise-v1/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export const useUpdatePushAlertActiveState = () => {
  return useMutation(
    api.tables.push_alerts_subscriptions.mutations.updatePushAlertsActiveState,
  );
};
