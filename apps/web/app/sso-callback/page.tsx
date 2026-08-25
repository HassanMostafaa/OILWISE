"use client";

import { useEffect } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  useEffect(() => {
    const finalize = async () => {
      if (signIn.status === "complete") {
        await signIn.finalize();
        window.close();
        return;
      }

      if (signUp.status === "complete") {
        await signUp.finalize();
        window.close();
      }
    };

    finalize();
  }, [signIn, signUp]);

  return <p>Completing authentication...</p>;
}
