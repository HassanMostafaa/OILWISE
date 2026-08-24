import { auth, clerkClient } from "@clerk/nextjs/server";

const STATUS_STYLES: Record<string, string> = {
  active: "border-green-500 text-green-600",
  removed: "border-red-500 text-red-600",
  expired: "border-orange-500 text-orange-600",
};

const formatDate = (ts?: number) =>
  ts
    ? new Date(ts).toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "medium",
      })
    : "null";

const renderValue = (val: unknown) => {
  if (val == null)
    return (
      <span className="rounded border px-2 py-0.5 text-xs text-muted-foreground">
        {String(val)}
      </span>
    );
  if (typeof val === "boolean")
    return (
      <span className="rounded border px-2 py-0.5 text-xs">{String(val)}</span>
    );
  return <span className="break-all">{String(val)}</span>;
};

const DataGrid = ({ items }: { items: [string, unknown][] }) => (
  <div className="grid gap-3 md:grid-cols-2">
    {items.map(([title, val]) => (
      <div key={title} className="border p-3">
        <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">
          {title}
        </p>
        <div className="text-sm">{renderValue(val)}</div>
      </div>
    ))}
  </div>
);

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
      <div>
        <h1 className="text-xl font-semibold">Session Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Authentication sessions associated with the current user.
        </p>
      </div>
      <div className="rounded-full border px-3 py-1 text-sm mb-3 w-fit">
        {totalCount} sessions
      </div>

      <div className="space-y-5">
        {sessions.map((s) => {
          const act = s.latestActivity;
          const tags = [
            act?.browserName,
            act?.deviceType,
            act?.city,
            act?.country,
            act?.isMobile != null
              ? act.isMobile
                ? "Mobile"
                : "Desktop"
              : null,
          ];

          return (
            <article key={s.id} className="space-y-5 border p-4">
              <header className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-semibold">Session</h2>
                  <p className="break-all text-xs text-muted-foreground">
                    {s.id}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium uppercase ${STATUS_STYLES[s.status] ?? "border-gray-400 text-gray-600"}`}
                >
                  {s.status}
                </span>
              </header>

              <DataGrid
                items={[
                  ["Session ID", s.id],
                  ["Client ID", s.clientId],
                  ["User ID", s.userId],
                  ["Status", s.status],
                ]}
              />

              <div>
                <h3 className="mb-2 text-sm font-semibold">Timeline</h3>
                <DataGrid
                  items={[
                    ["Created", formatDate(s.createdAt)],
                    ["Updated", formatDate(s.updatedAt)],
                    ["Last Active", formatDate(s.lastActiveAt)],
                    ["Expires", formatDate(s.expireAt)],
                    ["Abandoned At", formatDate(s.abandonAt)],
                  ]}
                />
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold">Latest Activity</h3>
                <DataGrid
                  items={[
                    ["Activity ID", act?.id],
                    ["IP Address", act?.ipAddress],
                    ["City", act?.city],
                    ["Country", act?.country],
                    ["Browser", act?.browserName],
                    ["Browser Version", act?.browserVersion],
                    ["Device", act?.deviceType],
                    ["Mobile", act?.isMobile],
                  ]}
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <span
                      key={i}
                      className="rounded-full border px-2 py-1 text-xs"
                    >
                      {t ?? "null"}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold">Actor</h3>
                <div className="border p-3 text-sm">{renderValue(s.actor)}</div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
