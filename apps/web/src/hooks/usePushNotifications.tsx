// hooks/usePushNotifications.ts

"use client";

import { useEffect, useState } from "react";

type RegistrationStatus =
  | "checking"
  | "registered"
  | "unregistered"
  | "unsupported";

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "default",
  );

  const [registrationStatus, setRegistrationStatus] =
    useState<RegistrationStatus>("checking");

  useEffect(() => {
    const checkRegistration = async () => {
      if (!("serviceWorker" in navigator)) {
        setRegistrationStatus("unsupported");
        return;
      }

      const registration = await navigator.serviceWorker.getRegistration();

      setRegistrationStatus(registration ? "registered" : "unregistered");
    };

    checkRegistration();
  }, []);

  const enablePushNotifications = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setRegistrationStatus("unsupported");
      throw new Error("Push notifications are not supported");
    }

    const permission = await Notification.requestPermission();

    setPermission(permission);

    if (permission !== "granted") {
      return { permission, registration: null };
    }

    const registration = await navigator.serviceWorker.register("/sw.js");

    await navigator.serviceWorker.ready;

    setRegistrationStatus("registered");

    return { registration, permission };
  };

  const disablePushNotifications = async () => {
    if (!("serviceWorker" in navigator)) return;

    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
      setRegistrationStatus("unregistered");
      return;
    }

    await registration.unregister();

    setRegistrationStatus("unregistered");
  };

  return {
    permission,
    registrationStatus,
    enablePushNotifications,
    disablePushNotifications,
  };
};
