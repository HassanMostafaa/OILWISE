import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const HeaderNav = () => {
  return (
    <header className="flex justify-between items-center p-5">
      <div className="flex gap-6 underline items-center">
        <Link href="/">Home</Link>

        <Show when="signed-out">
          <Link href="/sign-in">Sign in</Link>

          <Link href="/sign-up">Sign up</Link>
        </Show>

        <Show when="signed-in">
          <Link href="/internal/dashboard">Dashboard</Link>

          <Link href="/tester">Tester</Link>
        </Show>
      </div>

      <Show when="signed-in">
        <UserButton
          showName
          userProfileMode="navigation"
          userProfileUrl="/profile"
        />
      </Show>
    </header>
  );
};
