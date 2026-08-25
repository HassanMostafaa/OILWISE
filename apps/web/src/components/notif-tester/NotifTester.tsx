"use client";

import { api } from "@oilwise-v1/backend/convex/_generated/api";
// import { NotificationBell } from "../notification-bell/NotificationBell";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { NotificationCard } from "../notification-card/NotificationCard";

export const NotifTester = () => {
  const { isAuthenticated } = useConvexAuth();

  const list = useQuery(api.notifications.list, isAuthenticated ? {} : "skip");
  const counts = useQuery(
    api.notifications.counts,
    isAuthenticated ? {} : "skip",
  );
  const unseenCount = useQuery(
    api.notifications.unseenCount,
    isAuthenticated ? {} : "skip",
  );

  // const markSeen = useMutation(api.notifications.markSeen);

  const markAllSeen = useMutation(api.notifications.markAllSeen);

  // const dismiss = useMutation(api.notifications.dismiss);

  const dismissAll = useMutation(api.notifications.dismissAll);

  // console.log({
  //   list,
  //   counts,
  //   unseenCount,
  //   markSeen,
  //   markAllSeen,
  //   dismiss,
  //   dismissAll,
  // });

  return (
    <div className="space-y-4 max-w-2xl p-4">
      <div className="space-y-2">
        <p>Unseen: {unseenCount}</p>

        <pre className="overflow-auto border p-2 text-xs">
          {JSON.stringify(counts, null, 2)}
        </pre>
      </div>

      <div className="space-y-2">
        {list?.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <button className="border px-3 py-2" onClick={() => markAllSeen()}>
          Mark all seen
        </button>

        <button className="border px-3 py-2" onClick={() => dismissAll()}>
          Dismiss all
        </button>
      </div>
    </div>
  );
};
