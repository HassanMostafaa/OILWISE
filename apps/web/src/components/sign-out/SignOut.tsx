"use client";

// import { useDisableCurrentPushSubscription } from "@/hooks/useDisableCurrentPushSubscription";
import { useClerk } from "@clerk/nextjs";

export const SignOut = () => {
  const { signOut } = useClerk();
  // const deletePushSubscription = useDisableCurrentPushSubscription();
  const handleSignOut = async () => {
    // await deletePushSubscription();
    await signOut();
  };

  return (
    <button className="border px-4 py-2" type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
};
