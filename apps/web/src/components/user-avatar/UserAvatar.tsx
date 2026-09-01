"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { User } from "lucide-react";

export const UserAvatar = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="opacity-10">
        <User />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="opacity-10">
        <User />
      </div>
    );
  }

  return (
    <Image
      src={user.imageUrl}
      alt={user.fullName ?? "User avatar"}
      width={42}
      height={42}
    />
  );
};
