import { auth, clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";

import { revokeSession } from "./actions";

const PAGE_SIZE = 10;

type SessionStatus =
  | "abandoned"
  | "active"
  | "ended"
  | "expired"
  | "removed"
  | "replaced"
  | "revoked";

const allowedStatuses: SessionStatus[] = [
  "active",
  "ended",
  "expired",
  "removed",
  "replaced",
  "revoked",
  "abandoned",
];

type SessionStatusFilter = SessionStatus | "all";

const filters: SessionStatusFilter[] = ["all", ...allowedStatuses];

export const AccountSessions = async ({
  searchParams,
}: {
  searchParams: Promise<{
    offset?: string;
    status?: string;
  }>;
}) => {
  const { userId, sessionId } = await auth();

  if (!userId || !sessionId) {
    return <p>Not authenticated</p>;
  }

  const { offset: offsetParam, status: statusParam } = await searchParams;

  const offset = Number(offsetParam ?? 0);

  const status: SessionStatusFilter = allowedStatuses.includes(
    statusParam as SessionStatus,
  )
    ? (statusParam as SessionStatus)
    : "all";

  const client = await clerkClient();

  const result =
    status === "all"
      ? await client.sessions.getSessionList({
          userId,
          limit: PAGE_SIZE,
          offset,
        })
      : await client.sessions.getSessionList({
          userId,
          limit: PAGE_SIZE,
          offset,
          status,
        });

  const { data: sessions, totalCount } = result;

  console.log({ sessions, status });

  const nextOffset = offset + PAGE_SIZE;
  const previousOffset = Math.max(0, offset - PAGE_SIZE);

  const hasNextPage = nextOffset < totalCount;
  const hasPreviousPage = offset > 0;

  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const from = totalCount === 0 ? 0 : offset + 1;
  const to = offset + sessions.length;

  return (
    <section>
      <h1>Account Sessions</h1>

      <nav>
        {filters.map((filter) =>
          status !== filter ? (
            <Link key={filter} href={`?status=${filter}&offset=0`}>
              <button disabled={status === filter}>{filter}</button>
            </Link>
          ) : null,
        )}
      </nav>

      <p>
        Showing {from}-{to} of {totalCount} · Page {currentPage} of {totalPages}
      </p>

      {sessions.map((session) => (
        <article key={session.id}>
          <p>
            Session ID: {session.id}
            {session.id === sessionId && " — CURRENT"}
          </p>

          <p>Status: {session.status}</p>
          {session.status === "active" && (
            <form action={revokeSession}>
              <input type="hidden" name="sessionId" value={session.id} />

              <button type="submit">Revoke</button>
            </form>
          )}
        </article>
      ))}

      {hasPreviousPage && (
        <Link href={`?status=${status}&offset=${previousOffset}`}>
          <button>Previous</button>
        </Link>
      )}

      {hasNextPage && (
        <Link href={`?status=${status}&offset=${nextOffset}`}>
          <button>Next</button>
        </Link>
      )}
    </section>
  );
};
