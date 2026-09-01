import { AccountSessions } from "@/components/account-sessions/AccountSessions";
import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{
    offset?: string;
    status?: string;
  }>;
}) {
  await auth.protect();

  return (
    <div className="space-y-5">
      <UserProfile />

      <AccountSessions searchParams={searchParams} />
    </div>
  );
}
