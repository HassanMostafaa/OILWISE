"use client";

import { useEffect } from "react";
import { useConvexAuth } from "convex/react";
import { useToggleCurrentPushSubscription } from "@/hooks/useToggleCurrentPushSubscription";

export const PushSubscriptionSync = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const togglePushSubscription = useToggleCurrentPushSubscription();

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    togglePushSubscription(true);
  }, [isAuthenticated, isLoading, togglePushSubscription]);

  return null;
};
