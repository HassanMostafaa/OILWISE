"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/nextjs";
import { Eye, EyeClosed } from "lucide-react";
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa";

import { FormInputErrorMessage } from "../form-input-error-message/FormInputErrorMessage";
import { useRedirectUrl } from "@/hooks/useRedirectUrl";
import { handleSSOSignIn } from "@/services/auth/handleSSOSignIn";
import { useUpdatePushAlertActiveState } from "@/services/push-alert-subscriptions/hooks/updatePushAlertActiveState";
import { getBrowserId } from "@/utils/getBrowserId";
import { urlBase64ToUint8Array } from "@/utils/urlBase64ToUint8Array";

const ssoProviders = [
  { strategy: "oauth_google", icon: FaGoogle },
  { strategy: "oauth_github", icon: FaGithub },
  { strategy: "oauth_apple", icon: FaApple },
] as const;

export interface ILoginFormValues {
  identifier: string;
  password: string;
}

const defaultValues: ILoginFormValues = {
  identifier: "",
  password: "",
};

export const SignInForm = () => {
  const form = useForm<ILoginFormValues>({ defaultValues });
  const [hidePassword, setHidePassword] = useState(true);

  const { signIn, fetchStatus, errors } = useSignIn();
  const { redirectUrl, redirect } = useRedirectUrl();

  const updatePushAlertActiveState = useUpdatePushAlertActiveState();

  const onSubmit = async ({ identifier, password }: ILoginFormValues) => {
    const { error } = await signIn.password({
      emailAddress: identifier,
      password,
    });

    if (error || signIn.status !== "complete") return;

    await signIn.finalize();

    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
      redirect();
      return;
    }

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription && Notification.permission === "granted") {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "",
        ),
      });
    }

    if (subscription) {
      await updatePushAlertActiveState({
        active: true,
        browserId: getBrowserId() ?? "",
        subscription: subscription.toJSON(),
      });
    }

    redirect();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {ssoProviders.map(({ strategy, icon: Icon }) => (
        <button
          key={strategy}
          type="button"
          onClick={() =>
            handleSSOSignIn({
              signIn,
              strategy,
              redirectUrl,
              browserId: getBrowserId() ?? "",
              updatePushAlertActiveState,
            })
          }
        >
          <Icon />
        </button>
      ))}
      <div>
        <input
          type="text"
          placeholder="Enter your email address or username"
          {...form.register("identifier", {
            required: "Email is required",
          })}
        />

        <FormInputErrorMessage
          message={
            form.formState.errors.identifier?.message ??
            errors?.fields?.identifier?.message
          }
        />
      </div>

      <div className="relative">
        <input
          type={hidePassword ? "password" : "text"}
          placeholder="Enter your password"
          {...form.register("password", {
            required: "Password is required",
          })}
        />

        <button
          className="absolute top-1/2  -translate-y-1/2"
          type="button"
          onClick={() => setHidePassword((value) => !value)}
        >
          {hidePassword ? <Eye /> : <EyeClosed />}
        </button>

        <FormInputErrorMessage
          message={
            form.formState.errors.password?.message ??
            errors?.fields?.password?.message
          }
        />
      </div>

      <button type="submit" disabled={fetchStatus === "fetching"}>
        {fetchStatus === "fetching" ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
