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

    if (results?.length <= initialNumItems) {
      loadMore(initialNumItems);
    }
  };

  if (isAuthLoading) {
    return <span>Authenticating...</span>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if ((!results?.length || results?.length <= 0) && status !== "CanLoadMore") {
    return null;
  }

  return (
    <div className="flex-1  space-y-3 border p-2">
      <h1>Numbers list</h1>

      <ul className="flex flex-col gap-2">
        {results.map((number) => (
          <li key={number._id} className="flex justify-between border p-2">
            <span>{number.value}</span>

            <button onClick={() => handleDelete(number._id)}>
              <Trash className="h-4 w-4" />
            </button>
          </li>
        ))}
        {isLoading && <span>Loading...</span>}
      </ul>

      {!isLoading && status === "CanLoadMore" && (
        <button
          onClick={() => loadMore(initialNumItems)}
          className="border p-2"
        >
          Load more
        </button>
      )}

      {/* {status === "LoadingMore" && <span>Loading more...</span>} */}

      {/* {status === "Exhausted" && <span>Done</span>} */}
    </div>
  );
};
