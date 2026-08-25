"use client";
import { useForm } from "react-hook-form";
import { FormInputErrorMessage } from "../form-input-error-message/FormInputErrorMessage";
import { useInsertNumberService } from "@/services/numbers/insertNumberService";
import { toast } from "sonner";

export interface INumbersFormValues {
  value: string;
}
const defaultValues = {
  value: "",
};

export const NumbersForm = () => {
  const numbersForm = useForm<INumbersFormValues>({ defaultValues });
  const insertNumberService = useInsertNumberService();

  const handleSubmit = async (data: INumbersFormValues) => {
    await insertNumberService(data);
    numbersForm.clearErrors();
    numbersForm.reset();

    // Focus the input field after resetting
    setTimeout(() => {
      numbersForm.setFocus("value");
      toast.success(`Value (${data.value}) is inserted`);
    }, 50);
  };

  return (
    <form
      className="border border-gray-300 p-3 space-y-3"
      onSubmit={numbersForm.handleSubmit(async (data) => {
        if (data.value === undefined) return;
        await handleSubmit(data);
      })}
    >
      <h1>Numbers form</h1>
      <div className="space-y-1.5">
        <input
          type="text"
          placeholder="Number"
          {...numbersForm.register("value", {
            required: "Is required",
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
