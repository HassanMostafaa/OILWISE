import { api } from "@oilwise-v1/backend/convex/_generated/api";
import { Id } from "@oilwise-v1/backend/convex/_generated/dataModel";
import { fetchMutation } from "convex/nextjs";

export const deleteNumberByIdService = async (id: Id<"numbers">) => {
  return fetchMutation(api.tables.numbers.mutations.deleteNumberById, { id });
};
