// hooks/useRedirectUrl.ts

"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useRedirectUrl = (fallback = "/") => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect_url") ?? fallback;

  const redirect = () => {
    router.replace(redirectUrl);
  };

  return {
    redirectUrl,
    redirect,
  };
};
