"use client";
import { SignInForm } from "@/components/sign-in-form/SignInForm";

import { useAuth } from "@clerk/nextjs";

export const SignInPage = () => {
  const { isSignedIn, userId } = useAuth();

  if (!isSignedIn) {
    return <SignInForm />;
  }

  return <>{JSON.stringify({ isSignedIn, userId })}</>;
};
