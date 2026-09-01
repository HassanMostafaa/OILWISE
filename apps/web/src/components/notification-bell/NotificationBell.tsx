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
        aria-label="Notifications"
        disabled={isLoading}
        className="text-xs flex"
      >
        <Bell />

        {!isLoading && unseenCount && unseenCount > 0 ? (
          <>{unseenCount > 99 ? "99+" : unseenCount}</>
        ) : null}
      </button>
    </Link>
  );
};
