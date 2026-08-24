"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignIn, useSignIn } from "@clerk/nextjs";
import { Eye, EyeClosed } from "lucide-react";
import { FormInputErrorMessage } from "../form-input-error-message/FormInputErrorMessage";
import { useRouter, useSearchParams } from "next/navigation";

export interface ILoginFormValues {
  identifier: string;
  password: string;
}

const defaultValues: ILoginFormValues = {
  identifier: "",
  password: "",
};

export const LoginForm = () => {
  const form = useForm<ILoginFormValues>({ defaultValues });
  const [hidePassword, setHidePassword] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") ?? "/";
  const handleRedirectBackToProtectedRoute = () => router.replace(redirectUrl);

  const { signIn, fetchStatus, errors } = useSignIn();

  const onSubmit = async ({ identifier, password }: ILoginFormValues) => {
    const { error } = await signIn.password({
      emailAddress: identifier,
      password,
    });

    if (error) return;

    if (signIn.status === "complete") {
      await signIn.finalize({});
      if (redirectUrl) handleRedirectBackToProtectedRoute();
    }
  };

  return (
    // <form
    //   className="border border-gray-300 p-3 space-y-3"
    //   onSubmit={form.handleSubmit(onSubmit)}
    // >
    //   <h1>Login form</h1>

    //   <div>
    //     <input
    //       type="text"
    //       placeholder="Enter your email address"
    //       {...form.register("identifier", {
    //         required: "Email is required",
    //       })}
    //     />

    //     <FormInputErrorMessage
    //       message={
    //         form.formState.errors.identifier?.message ??
    //         errors?.fields?.identifier?.message
    //       }
    //     />
    //   </div>

    //   <div className="relative">
    //     <input
    //       className="w-full border pe-8"
    //       type={hidePassword ? "password" : "text"}
    //       placeholder="Enter your password"
    //       {...form.register("password", {
    //         required: "Password is required",
    //       })}
    //     />

    //     <button
    //       type="button"
    //       onClick={() => setHidePassword((prev) => !prev)}
    //       className="absolute right-2 top-2"
    //     >
    //       {hidePassword ? (
    //         <Eye className="h-4 w-4" />
    //       ) : (
    //         <EyeClosed className="h-4 w-4" />
    //       )}
    //     </button>

    //     <FormInputErrorMessage
    //       message={
    //         form.formState.errors.password?.message ??
    //         errors?.fields?.password?.message
    //       }
    //     />
    //   </div>

    //   <button
    //     className="border px-4 py-2"
    //     type="submit"
    //     disabled={fetchStatus === "fetching"}
    //   >
    //     {fetchStatus === "fetching" ? "Logging in..." : "Login"}
    //   </button>
    // </form>

    <SignIn
      appearance={{
        variables: {
          borderRadius: "0.5rem",
        },

        elements: {
          card: "shadow-none border",
          formButtonPrimary: "bg-black hover:bg-black/90",
          formFieldInput: "border rounded-md",
        },
      }}
    />
  );
};
