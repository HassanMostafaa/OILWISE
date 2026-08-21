import { INumbersFormValues } from "@/components/numbers-form/NumbersForm";
import { fetchMutation } from "convex/nextjs";
import { api } from "@oilwise-v1/backend/convex/_generated/api";

export const insertNumberService = async (data: INumbersFormValues) => {
  if (data.value === undefined) return;

  return fetchMutation(api.tables.numbers.mutations.insertNumber, {
    value: data.value,
  });
};
