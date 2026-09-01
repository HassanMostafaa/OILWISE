"use client";

import { useClerk } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

import { useUpdatePushAlertActiveState } from "@/services/push-alert-subscriptions/hooks/updatePushAlertActiveState";
import { getBrowserId } from "@/utils/getBrowserId";

export const SignOut = () => {
  const { signOut } = useClerk();

  const { isAuthenticated, isLoading } = useConvexAuth();

  const updatePushAlertActiveState = useUpdatePushAlertActiveState();

  const handleSignOut = async () => {
    if (isLoading || !isAuthenticated) return;

    const browserId = getBrowserId();

    if (!browserId) return;

    const registration = await navigator.serviceWorker.getRegistration();

    const subscription = await registration?.pushManager.getSubscription();

    await updatePushAlertActiveState({
      browserId,
      active: false,
      subscription: subscription?.toJSON(),
    });

    await signOut();
  };

  return (
    <button
      // className="border px-4 py-2"
      type="button"
      disabled={isLoading || !isAuthenticated}
      onClick={handleSignOut}
    >
      Sign out
    </button>
  );
};
