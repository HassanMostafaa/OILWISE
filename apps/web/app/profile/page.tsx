import { MySessionAnalytics } from "@/components/my-session-analytics/SessionAnalytics";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  await auth.protect();

  return (
    <div>
      Profile
      <MySessionAnalytics />
    </div>
  );
}
