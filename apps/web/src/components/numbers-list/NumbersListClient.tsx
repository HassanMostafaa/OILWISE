"use client";
import { deleteNumberByIdService } from "@/services/numbers/deleteNumberByIdService";
import { api } from "@oilwise/backend/convex/_generated/api";
import { Id } from "@oilwise/backend/convex/_generated/dataModel";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Trash } from "lucide-react";

export const NumbersListClient = ({
  preloadedNumbers,
}: {
  preloadedNumbers: Preloaded<typeof api.tables.numbers.queries.getAllNumbers>;
}) => {
  // THIS SUBSCRIBES FOR FUTURE UPDATES
  const numbers = usePreloadedQuery(preloadedNumbers);

  const handleDelete = async (id: Id<"numbers">) => {
    await deleteNumberByIdService(id);
  };

  return (
    <div className="p-2 flex-1 border">
      <h1>Numbers list</h1>
      <ul className="flex gap-2 flex-col">
        {numbers.map((number) => (
          <li key={number._id} className="border p-2 flex justify-between">
            {number.value}

            <button
              onClick={() => {
                handleDelete(number?._id);
              }}
            >
              <Trash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
