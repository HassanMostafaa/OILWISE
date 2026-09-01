import { Show } from "@clerk/nextjs";
import Link from "next/link";
import { SignOut } from "../sign-out/SignOut";
import { NotificationBell } from "../notification-bell/NotificationBell";
import { DashboardAccess } from "../dashboard-access/DashboardAccess";
import { UserAvatar } from "../user-avatar/UserAvatar";

export const HeaderNav = async () => {
  return (
    <header className="flex items-center justify-evenly">
      <Link href="/">Home</Link>

      <Show when="signed-in" fallback={null}>
        <DashboardAccess />

        <Link href="/tester">Tester</Link>

        <NotificationBell />
        <Link href="/profile">
          <UserAvatar />
        </Link>
        <SignOut />
      </Show>

      <Show when="signed-out">
        <Link href="/sign-up">Sign up</Link>
        <Link href="/sign-in">Sign in</Link>
      </Show>
    </header>
  );
};
