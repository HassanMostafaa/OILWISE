import "server-only";

import type { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { isRole, type Role } from "@/services/auth/roles";

interface RoleGuardProps {
  roles: Role[];
  children: ReactNode;
}

export const RoleGuard = async ({ roles, children }: RoleGuardProps) => {
  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth();

  if (!isAuthenticated) {
    return redirectToSignIn();
  }

  const role = sessionClaims?.metadata?.role;

  if (!isRole(role) || !roles.includes(role)) {
    redirect("/");
  }

  return children;
};
