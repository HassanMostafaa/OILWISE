"use client";

// apps/web/src/providers/AppProviders.tsx
import { FunctionComponent, PropsWithChildren } from "react";
import { ConvexClientProvider } from "./ConvexProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { UserProfileSync } from "@/page/UserProfileSync";
import { dark } from "@clerk/ui/themes";

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
        {children}
      </ConvexClientProvider>
    </ClerkProvider>
  );
};
