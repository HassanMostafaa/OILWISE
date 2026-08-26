import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SignOut } from "../sign-out/SignOut";
import { NotificationBell } from "../notification-bell/NotificationBell";
import { User, UserPlus } from "lucide-react";
import { DashboardAccess } from "../dashboard-access/DashboardAccess";

export const HeaderNav = async () => {
  return (
    <header className="flex justify-between items-center p-5">
      <div className="flex gap-6 underline items-center">
        <Link href="/">Home</Link>

        <Show when="signed-in">
          <DashboardAccess />

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

      <Show when="signed-out">
        <div className="flex gap-4 items-center">
          <Link className="flex click items-center gap-2" href="/sign-up">
            Sign up
            <UserPlus />
          </Link>
          <Link
            href="/sign-in"
            className="flex gap-2 click items-center rounded-full px-2!"
          >
            <User />
          </Link>
        </div>
      </Show>
    </header>
  );
};
