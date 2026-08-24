import { LoginForm } from "@/components/login-form/LoginForm";
import { NumbersForm } from "@/components/numbers-form/NumbersForm";
import { NumbersList } from "@/components/numbers-list/NumbersList";
import { RegisterForm } from "@/components/register-form/RegisterForm";
import { SignOut } from "@/components/sign-out/SignOut";
import { Show } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
// import { Authenticated, Unauthenticated } from "convex/react";

export default async function NextjsPage() {
  await auth.protect();

  return (
    <div className="p-2 w-full items-start justify-between flex gap-5 md:p-10">
      <div className="flex-1 space-y-5 max-w-2xl">
        <Show when="signed-in">
          <p>clerk - SIGNED IN</p>

          <SignOut />

          <NumbersForm />
        </Show>

        <Show when="signed-out">
          <p>SIGNED OUT</p>
          <RegisterForm />

          <LoginForm />
        </Show>

        {/* <SignUp /> */}

        {/* ONLY CLIENT */}
        {/* <Authenticated>
          <p>convex - SIGNED IN</p>
          </Authenticated> */}
        {/* 
        <Unauthenticated>
        <p>convex - SIGNED OUT</p>
        </Unauthenticated> */}
      </div>

      {/* NumbersList */}
      <NumbersList initialNumItems={5} />
    </div>
  );
}
