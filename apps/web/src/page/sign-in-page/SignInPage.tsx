import { LoginForm } from "@/components/login-form/LoginForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const SignInPage = async () => {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/profile");
  }

  return <LoginForm />;
};
