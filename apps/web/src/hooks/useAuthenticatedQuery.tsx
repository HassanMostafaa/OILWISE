"use client";

import { useConvexAuth, useQuery } from "convex/react";

import type { FunctionReference, OptionalRestArgs } from "convex/server";

export const useAuthenticatedQuery = <Query extends FunctionReference<"query">>(
  query: Query,
  ...args: OptionalRestArgs<Query>
) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();

  const data = useQuery(query, ...(isAuthenticated ? args : ["skip"]));

  return {
    data,
    isAuthenticated,
    isLoading: isAuthLoading || (isAuthenticated && data === undefined),
  };
};
