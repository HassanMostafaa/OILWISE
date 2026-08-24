import { Dashboard } from "@/page/dashboard/Dashboard";
import { RoleGuard } from "@/services/auth/RoleGuard";

export default async function NextjsPage() {
  return (
    <RoleGuard roles={["admin"]}>
      <Dashboard />
    </RoleGuard>
  );
}
