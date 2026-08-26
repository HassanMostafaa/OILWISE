"use client";

import { useClerk } from "@clerk/nextjs";
import { useToggleCurrentPushSubscription } from "@/hooks/useToggleCurrentPushSubscription";

export const SignOut = () => {
  const { signOut } = useClerk();
  const togglePushSubscription = useToggleCurrentPushSubscription();

  const handleSignOut = async () => {
    await togglePushSubscription(false);
    await signOut();
  };

  return (
    <button className="border px-4 py-2" type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
};
