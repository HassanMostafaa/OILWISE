import { SignInFutureResource } from "@clerk/nextjs/types";
import { sign } from "crypto";

interface ISSOAuthProps {
  signIn: SignInFutureResource;
  strategy: SSOProvider;
  redirectUrl: string;
}

type SSOProvider = "oauth_google" | "oauth_github" | "oauth_apple";

export const handleSSOSignIn = async ({
  redirectUrl,
  signIn,
  strategy,
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
  }
};
