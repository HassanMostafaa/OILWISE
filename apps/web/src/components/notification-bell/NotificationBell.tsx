"use client";

import { Bell } from "lucide-react";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@oilwise-v1/backend/convex/_generated/api";
import Link from "next/link";

export const NotificationBell = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();

  const unseenCount = useQuery(
    api.notifications.unseenCount,
    isAuthenticated ? {} : "skip",
  );

  const isLoading =
    isAuthLoading || (isAuthenticated && unseenCount === undefined);

  return (
    <Link href="/my-notifications">
      <button
        type="button"
        className="relative click px-2!"
        aria-label="Notifications"
        disabled={isLoading}
      >
        <Bell className="size-5" />

        {!isLoading && unseenCount && unseenCount > 0 ? (
          <div className="absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full border px-1 text-xs">
            {unseenCount > 99 ? "99+" : unseenCount}
          </div>
        ) : null}
      </button>
    </Link>
  );
};
