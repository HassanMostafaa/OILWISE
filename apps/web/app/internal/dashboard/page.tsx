import { Dashboard } from "@/page/dashboard/Dashboard";
import { RoleGuard } from "@/services/auth/RoleGuard";
import { ROLES } from "@/services/auth/roles";

export default async function NextjsPage() {
  return (
    <RoleGuard roles={[ROLES.Admin]}>
      <Dashboard />
    </RoleGuard>
  );
}
