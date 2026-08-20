"use client";
import { FunctionComponent, PropsWithChildren } from "react";
import { ConvexClientProvider } from "./ConvexProvider";

export const AppProviders: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
};
