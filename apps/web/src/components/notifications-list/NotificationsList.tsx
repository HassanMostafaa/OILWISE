"use client";
import { api } from "@oilwise-v1/backend/convex/_generated/api";
import { NotificationCard } from "../notification-card/NotificationCard";
import { useAuthenticatedQuery } from "@/hooks/useAuthenticatedQuery";

export const NotificationsList = () => {
  const { data: notifications, isLoading } = useAuthenticatedQuery(
    api.notifications.list,
    {},
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-wrap justify-center">
      {notifications?.map((notification) => (
        <NotificationCard key={notification._id} {...notification} />
      ))}
    </div>
  );
};
