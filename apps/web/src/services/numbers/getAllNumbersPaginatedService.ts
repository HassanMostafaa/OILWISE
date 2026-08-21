import { api } from "@oilwise/backend/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { FunctionArgs } from "convex/server";

export const getAllNumbersPaginatedService = async (
  args: FunctionArgs<typeof api.tables.numbers.queries.getAllNumberPaginated>,
) => {
  return fetchQuery(api.tables.numbers.queries.getAllNumberPaginated, args);
};
