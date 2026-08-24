import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const HeaderNav = () => {
  return (
    <header className="flex items-center gap-4 border-b p-3 [&>a]:underline">
      <Link href="/">Home</Link>

      <Link href="/internal/dashboard">Dashboard</Link>

      <Link href="/tester">Tester</Link>

      <Show when="signed-out">
        <Link href="/sign-in">Sign in</Link>

        <Link href="/sign-up">Sign up</Link>
      </Show>

      <Show when="signed-in">
        <UserButton showName />
      </Show>
    </header>
  );
};
