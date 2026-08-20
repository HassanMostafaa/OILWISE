// services/users/create-user.service.ts

import { fetchMutation } from "convex/nextjs";
import { api } from "@oilwise/backend/convex/_generated/api";
import { registerFormValues } from "@/components/register-form/RegisterForm";

export const createUserService = async (data: registerFormValues) => {
  return fetchMutation(api.tables.users.mutations.createUser, data);
};
