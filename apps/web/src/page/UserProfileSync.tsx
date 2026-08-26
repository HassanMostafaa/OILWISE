// UserProfileSync.tsx

"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";

import { api } from "@oilwise-v1/backend/convex/_generated/api";
import { getPushSubscriptionFromBrowser } from "@/utils/getPushSubscription";
import { useUpdatePushSubscriptionService } from "@/services/notifications/subscriptions/updatePushSubscription.serice";

export const UserProfileSync = () => {
  const { isLoaded: isClerkLoaded, isSignedIn, sessionId } = useAuth();

  const { isAuthenticated: isConvexAuthenticated, isLoading: isConvexLoading } =
    useConvexAuth();

  const ensureUserProfile = useMutation(
    api.tables.users.mutations.ensureUserProfile,
  );

  const updatePushSubscription = useUpdatePushSubscriptionService();

  useEffect(() => {
    if (!isClerkLoaded) return;
    if (!isSignedIn || !sessionId) return;

    if (isConvexLoading || !isConvexAuthenticated) return;

    const sync = async () => {
      // First make sure the Convex user exists.
      await ensureUserProfile();

      // Then re-enable this browser's existing subscription, if any.
      const subscription = await getPushSubscriptionFromBrowser();

      if (!subscription) return;

      await updatePushSubscription({
        endpoint: subscription.endpoint,
        enabled: true,
      });
    };

    sync();
  }, [
    isClerkLoaded,
    isSignedIn,
    sessionId,
    isConvexAuthenticated,
    isConvexLoading,
    ensureUserProfile,
    updatePushSubscription,
  ]);

  return null;
};
