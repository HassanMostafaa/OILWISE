import { api } from "@oilwise/backend/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export const getAllNumbersService = async () => {
  return fetchQuery(api.tables.numbers.queries.getAllNumbers);
};
