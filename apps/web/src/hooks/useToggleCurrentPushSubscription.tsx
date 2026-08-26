"use client";

import { useCallback } from "react";
import { getPushSubscriptionFromBrowser } from "@/utils/getPushSubscription";
import { useUpdatePushSubscriptionService } from "@/services/notifications/subscriptions/updatePushSubscription.serice";

export const useToggleCurrentPushSubscription = () => {
  const updatePushSubscription = useUpdatePushSubscriptionService();

  return useCallback(
    async (enabled: boolean) => {
      const subscription = await getPushSubscriptionFromBrowser();

      if (!subscription) return;

      await updatePushSubscription({
        endpoint: subscription.endpoint,
        enabled,
      });
    },
    [updatePushSubscription],
  );
};
