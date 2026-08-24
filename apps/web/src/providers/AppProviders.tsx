"use client";

// apps/web/src/providers/AppProviders.tsx
import { FunctionComponent, PropsWithChildren } from "react";
import { ConvexClientProvider } from "./ConvexProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const AppProviders: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ClerkProvider>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ClerkProvider>
  );
};
