import { LoginForm } from "@/components/login-form/LoginForm";
import { auth } from "@clerk/nextjs/server";

export const SignInPage = async () => {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    return <div>Already signed in</div>;
  }

  return <LoginForm />;
};
