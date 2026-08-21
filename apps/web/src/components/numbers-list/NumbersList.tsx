"use client";

import { api } from "@oilwise-v1/backend/convex/_generated/api";
import type { Id } from "@oilwise-v1/backend/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { deleteNumberByIdService } from "@/services/numbers/deleteNumberByIdService";
import { Trash } from "lucide-react";

export const NumbersList = ({
  initialNumItems,
}: {
  initialNumItems: number;
}) => {
  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.tables.numbers.queries.getAllNumberPaginated,
    {},
    {
      initialNumItems,
    },
  );

  const handleDelete = async (id: Id<"numbers">) => {
    await deleteNumberByIdService(id);
  };

  return (
    <div className="flex-1 border p-2">
      <h1>Numbers list</h1>

      <ul className="flex flex-col gap-2">
        {results.map((number) => (
          <li className="border flex justify-between p-2" key={number._id}>
            <span>{number.value}</span>

            <button onClick={() => handleDelete(number._id)}>
              <Trash className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      {status === "CanLoadMore" && (
        <button
          onClick={() => loadMore(initialNumItems)}
          className="border p-2"
        >
          Load more
        </button>
      )}

      {status === "LoadingMore" && <span>Loading...</span>}
      {isLoading && <span>Loading...</span>}

      {status === "Exhausted" && <span>Done</span>}
    </div>
  );
};
