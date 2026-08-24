// web/src/services/users/useCreateUserService.ts

"use client";

import { useMutation } from "convex/react";
import { api } from "@oilwise-v1/backend/convex/_generated/api";

export const useCreateUserService = () => {
  const registerUserProfile = useMutation(
    api.tables.users.mutations.registerUserProfile,
  );

  return registerUserProfile;
};
