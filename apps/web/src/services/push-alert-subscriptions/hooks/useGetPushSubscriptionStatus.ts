"use client";

import { api } from "@oilwise-v1/backend/convex/_generated/api";
import { useConvexAuth, useQuery } from "convex/react";

export const useGetPushSubscriptionStatus = (browserId: string | null) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const data = useQuery(
    api.tables.push_alerts_subscriptions.queries.getPushSubscriptionStatus,
    !isLoading && isAuthenticated && browserId ? { browserId } : "skip",
  );

  return {
    data,
    isLoading: isLoading || (isAuthenticated && data === undefined),
    isAuthenticated,
  };
};
