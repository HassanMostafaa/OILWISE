import { MySessionAnalytics } from "@/components/my-session-analytics/SessionAnalytics";
import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  await auth.protect();

  return (
    <div className="space-y-5">
      <UserProfile />

      <MySessionAnalytics />
    </div>
  );
}
