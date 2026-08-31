"use client";

import { useUpdatePushAlertActiveState } from "@/services/push-alert-subscriptions/hooks/updatePushAlertActiveState";
import { getBrowserId } from "@/utils/getBrowserId";
import { useClerk } from "@clerk/nextjs";

export const SignOut = () => {
  const { signOut } = useClerk();
  const updatePushAlertActiveState = useUpdatePushAlertActiveState();
  const browserId = getBrowserId() ?? "";

  // UPON SIGNOUT UPDATE PUSH ALERT ACTIVE STATE
  const active = false;

  const handleSignOut = async () => {
    await updatePushAlertActiveState({ active, browserId });
    await signOut();
  };

  return (
    <button className="border px-4 py-2" type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
};
