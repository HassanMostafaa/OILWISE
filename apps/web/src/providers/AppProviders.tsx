"use client";

import { FunctionComponent, PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import { Toaster } from "sonner";

import { ConvexClientProvider } from "./ConvexProvider";
import { UserProfileSync } from "@/page/UserProfileSync";
import { NotificationToastSync } from "./NotificationsToastSync";

export const AppProviders: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
      }}
    >
      <ConvexClientProvider>
        <UserProfileSync />
        <NotificationToastSync />

        {children}

        <Toaster position="top-right" richColors closeButton />
      </ConvexClientProvider>
    </ClerkProvider>
  );
};
