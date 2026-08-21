"use client";
import { deleteNumberByIdService } from "@/services/numbers/deleteNumberByIdService";
import { api } from "@oilwise/backend/convex/_generated/api";
import { Id } from "@oilwise/backend/convex/_generated/dataModel";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Trash } from "lucide-react";
import moment from "moment";

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
    <div>
      <h1>Numbers list</h1>
      <ul className="flex flex-col gap-2">
        {numbers.map((number) => (
          <li
            key={number._id}
            className="flex min-h-12 items-center justify-between rounded-md border border-cyan-100/80 bg-cyan-50/60 px-3 py-2 text-sm font-medium text-slate-800 transition hover:border-cyan-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-cyan-700/60 dark:hover:bg-slate-900"
          >
            <span>{number.value}</span>

            <button
              onClick={() => {
                handleDelete(number?._id);
              }}
            >
              <Trash className="h-4 w-4" />
            </button>

            <span className="text-[8px] border p-1 rounded-full">
              {moment(number?._creationTime).format("MMMM Do YYYY, h:mm:ss a")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
