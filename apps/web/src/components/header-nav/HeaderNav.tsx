import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SignOut } from "../sign-out/SignOut";
import { NotificationBell } from "../notification-bell/NotificationBell";

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

          <SignOut />
        </Show>
      </div>

      <Show when="signed-in" fallback={null}>
        <div className="flex gap-2 itemce">
          <NotificationBell />
          <UserButton
            showName
            userProfileMode="navigation"
            userProfileUrl="/profile"
          />
        </div>
      </Show>
    </header>
  );
};
