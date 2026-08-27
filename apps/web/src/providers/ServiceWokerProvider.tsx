"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export const ServiceWorkerProvider = () => {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(console.error);
  }, [isLoaded, isSignedIn]);

  return null;
};
