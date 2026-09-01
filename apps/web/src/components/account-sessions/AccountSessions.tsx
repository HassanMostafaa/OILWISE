import { auth, clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";

import { revokeSession } from "./actions";

const PAGE_SIZE = 10;

type SessionStatus =
  | "abandoned"
  | "active"
  | "pending"
  | "ended"
  | "expired"
  | "removed"
  | "replaced"
  | "revoked";

const allowedStatuses: SessionStatus[] = [
  "active",
  "pending",
  "ended",
  "expired",
  "removed",
  "replaced",
  "revoked",
  "abandoned",
];

type SessionStatusFilter = (typeof allowedStatuses)[number] | "all";

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
    statusParam as (typeof allowedStatuses)[number],
  )
    ? (statusParam as SessionStatusFilter)
    : "all";

  const client = await clerkClient();

  const { data: sessions, totalCount } = await client.sessions.getSessionList({
    userId,
    limit: PAGE_SIZE,
    offset,
    ...(status !== "all"
      ? {
          status,
        }
      : {}),
  });

  const nextOffset = offset + PAGE_SIZE;
  const hasNextPage = nextOffset < totalCount;

  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const from = totalCount === 0 ? 0 : offset + 1;
  const to = offset + sessions.length;

  return (
    <section>
      <h1>Account Sessions</h1>

      <nav>
        <Link href="?status=all">All</Link>{" "}
        <Link href="?status=active">Active</Link>{" "}
        <Link href="?status=replaced">Replaced</Link>{" "}
        <Link href="?status=removed">Removed</Link>
      </nav>
      <p>
        Showing {from}-{to} of {totalCount} · Page {currentPage} of {totalPages}
      </p>

      {sessions.map((session) => (
        <article key={session.id}>
          <p>
            {session.id}
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
          Previous
        </Link>
      )}

      {hasNextPage && (
        <Link href={`?status=${status}&offset=${nextOffset}`}>Next</Link>
      )}
    </section>
  );
};
