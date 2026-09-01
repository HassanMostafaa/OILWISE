"use client";

import { FunctionComponent, PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import { Toaster } from "sonner";

import { ConvexClientProvider } from "./ConvexProvider";
import { UserProfileSync } from "@/page/UserProfileSync";
import { NotificationToast } from "./NotificationsToast";
import { ServiceWorkerProvider } from "./ServiceWokerProvider";

export const AppProviders: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        {children}

        <UserProfileSync />
        <NotificationToast />
        <ServiceWorkerProvider />
        <Toaster position="top-right" richColors closeButton />
      </ConvexClientProvider>
    </ClerkProvider>
  );
};
