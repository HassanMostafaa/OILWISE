"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInputErrorMessage } from "../form-input-error-message/FormInputErrorMessage";
import { Eye, EyeClosed } from "lucide-react";

export interface ILoginFormValues {
  identifier: string;
  password: string;
}

const defaultValues: ILoginFormValues = {
  identifier: "",
  password: "",
};

export const LoginForm = () => {
  const loginForm = useForm({ defaultValues });
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const showHidePassword = () => {
    setHidePassword((prev) => !prev);
  };
  return (
    <form
      className="  border border-gray-300 p-3 space-y-3"
      onSubmit={loginForm.handleSubmit((data) => {
        console.log({ data });
      })}
    >
      <h1>Login form</h1>
      {/* ID INPUT */}
      <div>
        <input
          type="text"
          placeholder="Enter your username or email address"
          {...loginForm.register("identifier", { required: "Required" })}
        />
        <FormInputErrorMessage
          message={loginForm?.formState?.errors?.identifier?.message}
        />
      </div>
      <div className="relative">
        <input
          className="w-full border pe-5!"
          type={hidePassword ? "password" : "text"}
          placeholder="Enter your password"
          {...loginForm.register("password", { required: "Required" })}
        />

        {hidePassword ? (
          <Eye onClick={showHidePassword} className="absolute right-2 top-2" />
        ) : (
          <EyeClosed
            className="absolute right-2 top-2"
            onClick={showHidePassword}
          />
        )}
        <FormInputErrorMessage
          message={loginForm?.formState?.errors?.password?.message}
        />
      </div>

      <button className="border px-4 py-2" type="submit">
        Login
      </button>
    </form>
  );
};
