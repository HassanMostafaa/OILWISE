import { SignInFutureResource } from "@clerk/nextjs/types";
import { ReactMutation } from "convex/react";
import { FunctionReference } from "convex/server";

interface ISSOAuthProps {
  signIn: SignInFutureResource;
  strategy: SSOProvider;
  redirectUrl: string;
  browserId: string;
  // updatePushAlertActiveState: ({
  // browserId,
  // active,
  // }: {
  // browserId: string;
  // active: /boolean;
  // }) => Promise<void>;
  updatePushAlertActiveState: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      {
        browserId: string;
        active: boolean;
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

  // Popup blocked → try a normal new tab
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
  } else {
    await signIn.finalize();
    await updatePushAlertActiveState({ active: true, browserId });
  }
};
