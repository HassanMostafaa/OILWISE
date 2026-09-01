"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormInputErrorMessage } from "../form-input-error-message/FormInputErrorMessage";
import { useInsertNumberService } from "@/services/numbers/insertNumberService";

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

    setTimeout(() => {
      numbersForm.setFocus("value");
      toast.success(`Value (${data.value}) is added`);
    }, 50);
  };

  return (
    <form onSubmit={numbersForm.handleSubmit(handleSubmit)}>
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

      <button type="submit">Submit</button>
    </form>
  );
};
