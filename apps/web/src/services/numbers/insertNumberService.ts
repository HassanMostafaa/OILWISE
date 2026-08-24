"use client";

import { useMutation } from "convex/react";
import { api } from "@oilwise-v1/backend/convex/_generated/api";

export const useInsertNumberService = () => {
  return useMutation(api.tables.numbers.mutations.insertNumber);
};
