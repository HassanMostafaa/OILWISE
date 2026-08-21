"use client";
import { useForm } from "react-hook-form";
import { FormInputErrorMessage } from "../form-input-error-message/FormInputErrorMessage";
import { insertNumberService } from "@/services/numbers/insertNumberService";

export interface INumbersFormValues {
  value?: number;
}
const defaultValues = {
  value: undefined,
};

export const NumbersForm = () => {
  const numbersForm = useForm({ defaultValues });

  const handleSubmit = async (data: INumbersFormValues) => {
    await insertNumberService(data);
    numbersForm.clearErrors();
    numbersForm.reset();
  };

  return (
    <form
      onSubmit={numbersForm.handleSubmit(async (data) => {
        console.log({ data });
        if (data.value === undefined) return;

        await handleSubmit(data);
      })}
      className="border border-gray-300 p-3 space-y-3"
    >
      <h1>Numbers form</h1>
      <div>
        <input
          type="number"
          placeholder="Number"
          defaultValue={""}
          {...numbersForm.register("value", {
            required: "Number is required",
            valueAsNumber: true,
          })}
        />
        <FormInputErrorMessage
          message={numbersForm.formState.errors.value?.message}
        />
      </div>

      <button className="border px-4 py-2" type="submit">
        Submit
      </button>
    </form>
  );
};
