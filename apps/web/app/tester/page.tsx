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
    <div className="p-2 space-y-5 md:p-10">
      <Show when="signed-in">
        <p>clerk - SIGNED IN</p>

        <SignOut />

        <NumbersForm />
        <NumbersList initialNumItems={5} />
      </Show>
    </div>
  );
}
