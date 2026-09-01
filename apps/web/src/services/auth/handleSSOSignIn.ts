import { SignInFutureResource } from "@clerk/nextjs/types";
import { ReactMutation } from "convex/react";
import { FunctionReference } from "convex/server";

interface ISSOAuthProps {
  signIn: SignInFutureResource;
  strategy: SSOProvider;
  redirectUrl: string;
  browserId: string;

  updatePushAlertActiveState: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      {
        browserId: string;
        active: boolean;
        subscription?: {
          endpoint?: string;
          expirationTime?: number | null;
          keys?: Record<string, string>;
        };
      },
      null,
      string | undefined
    >
  >;
}

type SSOProvider = "oauth_google" | "oauth_github" | "oauth_apple";
export const handleSSOSignIn = async ({
  redirectUrl,
  signIn,
  strategy,
  browserId,
  updatePushAlertActiveState,
}: ISSOAuthProps) => {
  let authWindow = window.open("", "clerk-sso", "width=500,height=650");

  if (!authWindow) {
    authWindow = window.open("", "_blank");
  }

  if (!authWindow) {
    console.error("Browser blocked the authentication window");
    return;
  }

  const { error } = await signIn.sso({
    strategy,
    popup: authWindow,
    redirectUrl,
    redirectCallbackUrl: "/",
  });

  if (error) {
    authWindow.close();
    console.error(error);
    return;
  }

  await signIn.finalize();

  const registration = await navigator.serviceWorker.getRegistration();

  const subscription = await registration?.pushManager.getSubscription();
  console.log({ sub: subscription?.toJSON() });

  await updatePushAlertActiveState({
    active: true,
    browserId,
    subscription: subscription?.toJSON(),
  });
};
