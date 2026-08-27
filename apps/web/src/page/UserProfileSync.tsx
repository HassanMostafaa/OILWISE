// UserProfileSync.tsx

"use client";

import { useEffect } from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@oilwise-v1/backend/convex/_generated/api";

export const UserProfileSync = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const ensureUserProfile = useMutation(
    api.tables.users.mutations.ensureUserProfile,
  );

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    ensureUserProfile();
  }, [isAuthenticated, isLoading, ensureUserProfile]);

  return null;
};
