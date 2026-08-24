"use client";

import { useClerk } from "@clerk/nextjs";

export const SignOut = () => {
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <button className="border px-4 py-2" type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
};
