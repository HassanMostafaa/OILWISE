// Server Component
import { preloadQuery } from "convex/nextjs";
import { api } from "@oilwise/backend/convex/_generated/api";
import { NumbersListClient } from "./NumbersListClient";

export const NumbersList = async () => {
  const preloadedNumbers = await preloadQuery(
    api.tables.numbers.queries.getAllNumbers,
  );

  return <NumbersListClient preloadedNumbers={preloadedNumbers} />;
};
