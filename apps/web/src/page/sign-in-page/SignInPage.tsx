"use client";
import { LoginForm } from "@/components/login-form/LoginForm";

import { useAuth } from "@clerk/nextjs";

export const SignInPage = () => {
  const { isSignedIn, userId } = useAuth();

  if (!isSignedIn) {
    return <LoginForm />;
  }

  return <>{JSON.stringify({ isSignedIn, userId })}</>;
};
