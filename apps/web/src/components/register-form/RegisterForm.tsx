"use client";

import { useForm } from "react-hook-form";
import { FormInputErrorMessage } from "../form-input-error-message/FormInputErrorMessage";
import { createUserService } from "@/services/users/createUser";

export interface registerFormValues {
  name: string;
  email: string;
}
const defaultValues: registerFormValues = {
  name: "",
  email: "",
};

export const RegisterForm = () => {
  const registerForm = useForm({ defaultValues });
  const handleSubmit = async (data: registerFormValues) => {
    await createUserService(data);
    registerForm.clearErrors();
    registerForm.reset();
  };

  return (
    <div className="w-2xl m-10 border border-gray-300 p-3 flex flex-col gap-4">
      RegisterForm
      <form
        className="flex flex-col gap-2 justify-start items-start"
        onSubmit={registerForm.handleSubmit(async (data) => {
          await handleSubmit(data);
        })}
      >
        <div>
          <input
            {...registerForm.register("name", {
              required: "Name is required",
            })}
            placeholder="Enter name"
          />

          <FormInputErrorMessage
            message={registerForm?.formState?.errors?.name?.message}
          />
        </div>

        <div>
          <input
            {...registerForm.register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Enter email address"
          />

          <FormInputErrorMessage
            message={registerForm?.formState?.errors?.email?.message}
          />
        </div>

        <button className="border px-4 py-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
