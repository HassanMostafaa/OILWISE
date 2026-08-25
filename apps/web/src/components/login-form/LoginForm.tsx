"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignIn, useSignIn } from "@clerk/nextjs";
import { Eye, EyeClosed } from "lucide-react";
import { FormInputErrorMessage } from "../form-input-error-message/FormInputErrorMessage";
import { useRedirectUrl } from "@/hooks/useRedirectUrl";
import { handleSSOSignIn } from "@/services/auth/handleSSOSignIn";
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa";

const ssoProviders = [
  {
    strategy: "oauth_google",
    icon: FaGoogle,
  },
  {
    strategy: "oauth_github",
    icon: FaGithub,
  },
  {
    strategy: "oauth_apple",
    icon: FaApple,
  },
] as const;

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

  const { redirectUrl, redirect } = useRedirectUrl();

  const { signIn, fetchStatus, errors } = useSignIn();

  const onSubmit = async ({ identifier, password }: ILoginFormValues) => {
    const { error } = await signIn.password({
      emailAddress: identifier,
      password,
    });

    if (error) return;

    if (signIn.status === "complete") {
      await signIn.finalize();
      redirect();
    }
  };

  return (
    // <form
    //   className="border max-w-2xl w-full border-gray-300 p-3 space-y-4"
    //   onSubmit={form.handleSubmit(onSubmit)}
    // >
    //   <div className="flex gap-2 items-center justify-center">
    //     {ssoProviders.map(({ strategy, icon: Icon }) => (
    //       <button
    //         key={strategy}
    //         type="button"
    //         className="border px-4 py-2 flex-1"
    //         onClick={async () => {
    //           handleSSOSignIn({
    //             signIn,
    //             strategy,
    //             redirectUrl,
    //           });
    //         }}
    //       >
    //         <Icon className="size-4 mx-auto" />
    //       </button>
    //     ))}
    //   </div>

    //   <div className="flex items-center gap-3">
    //     <div className="h-px flex-1 bg-gray-300" />
    //     <span className="text-xs text-gray-500">OR</span>
    //     <div className="h-px flex-1 bg-gray-300" />
    //   </div>

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
    //       className="absolute right-2 top-1/2 -translate-y-1/2"
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

    <SignIn />
  );
};
