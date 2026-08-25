"use client";

import { useForm } from "react-hook-form";
import { SignUp, useSignUp } from "@clerk/nextjs";
import { FormInputErrorMessage } from "../form-input-error-message/FormInputErrorMessage";
import { useCreateUserService } from "@/services/users/createUserService";

export interface IRegisterFormValues {
  username: string;
  email: string;
  name: string;
  password: string;
}

const defaultValues: IRegisterFormValues = {
  username: "",
  email: "",
  password: "",
  name: "",
};

export const RegisterForm = () => {
  const form = useForm<IRegisterFormValues>({ defaultValues });

  const {
    signUp,
    fetchStatus,
    // errors
  } = useSignUp();

  const createUserSvs = useCreateUserService();

  const onSubmit = async (data: IRegisterFormValues) => {
    const clerkSignUp = await signUp.password({
      emailAddress: data?.email,
      password: data?.password,
      username: data?.username,
    });

    if (clerkSignUp?.error) {
      console.error(clerkSignUp?.error);
      return;
    }

    await signUp.finalize();

    const createUserRes = await createUserSvs(data);
  };

  return (
    // <form
    //   className="border space-y-4 p-4"
    //   onSubmit={form.handleSubmit(onSubmit)}
    // >
    //   <h1>Register form</h1>

    //   <div>
    //     <input
    //       {...form.register("username", {
    //         required: "Username is required",
    //       })}
    //       placeholder="Enter name*"
    //     />

    //     <FormInputErrorMessage
    //       message={form.formState.errors.username?.message}
    //     />
    //   </div>

    //   <div>
    //     <input
    //       {...form.register("email", {
    //         required: "Email is required",
    //       })}
    //       type="email"
    //       placeholder="Enter email address*"
    //     />

    //     <FormInputErrorMessage message={form.formState.errors.email?.message} />
    //   </div>

    //   <div>
    //     <input
    //       {...form.register("password", {
    //         required: "Password is required",
    //       })}
    //       type="password"
    //       placeholder="Enter password*"
    //     />

    //     <FormInputErrorMessage
    //       message={form.formState.errors.password?.message}
    //     />
    //   </div>

    //   <button
    //     className="border px-4 py-2"
    //     type="submit"
    //     disabled={fetchStatus === "fetching"}
    //   >
    //     {fetchStatus === "fetching" ? "Creating..." : "Register"}
    //   </button>
    // </form>

    <SignUp />
  );
};
