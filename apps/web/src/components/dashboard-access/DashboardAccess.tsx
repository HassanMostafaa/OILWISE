import { ROLES } from "@/services/auth/roles";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const DashboardAccess = async () => {
  const { isAuthenticated, userId, sessionClaims } = await auth();

  if (!isAuthenticated || !userId || !sessionClaims) {
    return null;
  }

  if (sessionClaims.metadata?.role === ROLES.Admin) {
    return <Link href="/internal/dashboard">Dashboard</Link>;
  }
  return null;
};
