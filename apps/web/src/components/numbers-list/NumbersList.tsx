"use client";

import { api } from "@oilwise-v1/backend/convex/_generated/api";
import type { Id } from "@oilwise-v1/backend/convex/_generated/dataModel";
import { useConvexAuth, usePaginatedQuery } from "convex/react";

import { useDeleteNumberByIdService } from "@/services/numbers/deleteNumberByIdService";
import { Trash } from "lucide-react";

export const NumbersList = ({
  initialNumItems,
}: {
  initialNumItems: number;
}) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();

  const deleteNumberByIdService = useDeleteNumberByIdService();

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.tables.numbers.queries.getMyNumbersPaginated,
    isAuthenticated ? {} : "skip",
    {
      initialNumItems,
    },
  );

  const handleDelete = async (id: Id<"numbers">) => {
    await deleteNumberByIdService({ id });

    if (results.length <= initialNumItems) {
      loadMore(initialNumItems);
    }
  };

  if (isAuthLoading) {
    return <span>Authenticating...</span>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!results.length && status !== "CanLoadMore") {
    return null;
  }

  return (
    <div>
      <ul>
        {results.map((number) => (
          <li key={number._id}>
            <button onClick={() => handleDelete(number._id)}>
              <Trash />
            </button>
            <span>{number.value}</span>
          </li>
        ))}
      </ul>

      {isLoading && <span>Loading...</span>}

      {!isLoading && status === "CanLoadMore" && (
        <button onClick={() => loadMore(initialNumItems)}>Load more</button>
      )}
    </div>
  );
};
