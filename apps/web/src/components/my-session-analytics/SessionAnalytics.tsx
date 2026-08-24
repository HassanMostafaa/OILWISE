import { auth, clerkClient } from "@clerk/nextjs/server";
import moment from "moment";

const renderValue = (value: unknown) => {
  if (value === null) {
    return (
      <span className="rounded border px-2 py-0.5 text-xs text-muted-foreground">
        null
      </span>
    );
  }

  if (value === undefined) {
    return (
      <span className="rounded border px-2 py-0.5 text-xs text-muted-foreground">
        undefined
      </span>
    );
  }

  if (typeof value === "boolean") {
    return (
      <span className="rounded border px-2 py-0.5 text-xs">
        {value ? "true" : "false"}
      </span>
    );
  }

  return <span className="break-all">{String(value)}</span>;
};

const formatDate = (timestamp: number) => {
  return moment(timestamp).format("MMMM Do YYYY, h:mm:ss a");
};

const getStatusClassName = (status: string) => {
  switch (status) {
    case "active":
      return "border-green-500 text-green-600";
    case "removed":
      return "border-red-500 text-red-600";
    case "expired":
      return "border-orange-500 text-orange-600";
    default:
      return "border-gray-400 text-gray-600";
  }
};

export const MySessionAnalytics = async () => {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="border p-4">
        <h1 className="text-lg font-semibold">Session Analytics</h1>
        <p className="text-sm text-muted-foreground">Not authenticated</p>
      </div>
    );
  }

  const client = await clerkClient();

  const { data: sessions, totalCount } = await client.sessions.getSessionList({
    userId,
  });

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between border p-4">
        <div>
          <h1 className="text-xl font-semibold">Session Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Authentication sessions associated with the current user.
          </p>
        </div>

        <span className="rounded-full border px-3 py-1 text-sm">
          {totalCount} sessions
        </span>
      </header>

      <div className="grid gap-4">
        {sessions.map((session) => (
          <article key={session.id} className="space-y-5 border p-4">
            <header className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-semibold">Session</h2>
                <p className="break-all text-xs text-muted-foreground">
                  {session.id}
                </p>
              </div>

              <span
                className={[
                  "rounded-full border px-3 py-1 text-xs font-medium uppercase",
                  getStatusClassName(session.status),
                ].join(" ")}
              >
                {session.status}
              </span>
            </header>

            <div className="grid gap-3 md:grid-cols-2">
              <DataItem title="Session ID" value={session.id} />
              <DataItem title="Client ID" value={session.clientId} />
              <DataItem title="User ID" value={session.userId} />
              <DataItem title="Status" value={session.status} />
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Timeline</h3>

              <div className="grid gap-3 md:grid-cols-2">
                <DataItem
                  title="Created"
                  value={formatDate(session.createdAt)}
                />

                <DataItem
                  title="Updated"
                  value={formatDate(session.updatedAt)}
                />

                <DataItem
                  title="Last Active"
                  value={formatDate(session.lastActiveAt)}
                />

                <DataItem
                  title="Expires"
                  value={formatDate(session.expireAt)}
                />

                <DataItem
                  title="Abandoned At"
                  value={formatDate(session.abandonAt)}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Latest Activity</h3>

              <div className="grid gap-3 md:grid-cols-2">
                <DataItem
                  title="Activity ID"
                  value={session.latestActivity?.id}
                />

                <DataItem
                  title="IP Address"
                  value={session.latestActivity?.ipAddress}
                />

                <DataItem title="City" value={session.latestActivity?.city} />

                <DataItem
                  title="Country"
                  value={session.latestActivity?.country}
                />

                <DataItem
                  title="Browser"
                  value={session.latestActivity?.browserName}
                />

                <DataItem
                  title="Browser Version"
                  value={session.latestActivity?.browserVersion}
                />

                <DataItem
                  title="Device"
                  value={session.latestActivity?.deviceType}
                />

                <DataItem
                  title="Mobile"
                  value={session.latestActivity?.isMobile}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Tag value={session.latestActivity?.browserName} />
                <Tag value={session.latestActivity?.deviceType} />
                <Tag value={session.latestActivity?.city} />
                <Tag value={session.latestActivity?.country} />

                <Tag
                  value={
                    session.latestActivity?.isMobile ? "Mobile" : "Desktop"
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold">Actor</h3>

              <div className="border p-3 text-sm">
                {renderValue(session.actor)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const DataItem = ({ title, value }: { title: string; value: unknown }) => {
  return (
    <div className="border p-3">
      <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">
        {title}
      </p>

      <div className="text-sm">{renderValue(value)}</div>
    </div>
  );
};

const Tag = ({ value }: { value: string | null | undefined }) => {
  return (
    <span className="rounded-full border px-2 py-1 text-xs">
      {value ?? "null"}
    </span>
  );
};
