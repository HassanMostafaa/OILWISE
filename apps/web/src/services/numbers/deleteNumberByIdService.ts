// services/numbers/useDeleteNumberByIdService.ts

"use client";

import { useMutation } from "convex/react";
import { api } from "@oilwise-v1/backend/convex/_generated/api";

export const useDeleteNumberByIdService = () => {
  return useMutation(api.tables.numbers.mutations.deleteNumberById);
};
