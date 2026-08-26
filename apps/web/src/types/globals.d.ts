// types/globals.d.ts

import type { Role } from "@/auth/roles";

export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Role;
    };
  }
}
