import "server-only";

import { auth } from "@clerk/nextjs/server";

// import { redirect } from "next/navigation";
// import type { Role } from "@/services/auth/roles";

interface RoleGuardProps {
  roles: string[];
  children: React.ReactNode;
}

export const RoleGuard = async ({ roles, children }: RoleGuardProps) => {
  const { sessionClaims, redirectToSignIn } = await auth();

  if (!sessionClaims) {
    return redirectToSignIn();
  }

  const role = sessionClaims.metadata?.role;

  if (!role || !roles.includes(role)) {
    // redirect("/");
    return "You are not authorized to view this page";
  }

  return children;
};
