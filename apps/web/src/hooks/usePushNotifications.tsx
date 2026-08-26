// hooks/usePushNotifications.ts
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useSavePushSubscription } from "@/services/push-notifications-subscription/savePushSubscription";
import { urlBase64ToUint8Array } from "@/utils/urlBase64ToUint8Array";

type RegistrationStatus =
  | "checking"
  | "registered"
  | "unregistered"
  | "unsupported";

type SubscriptionStatus =
  | "checking"
  | "subscribed"
  | "unsubscribed"
  | "unsupported";

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";

export const usePushNotifications = () => {
  const savePushSubscription = useSavePushSubscription();

  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "default",
  );

  const [registrationStatus, setRegistrationStatus] =
    useState<RegistrationStatus>("checking");

  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus>("checking");

  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );

  useEffect(() => {
    const initialize = async () => {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setRegistrationStatus("unsupported");
        setSubscriptionStatus("unsupported");
        return;
      }

      const registration = await navigator.serviceWorker.getRegistration();

      if (!registration) {
        setRegistrationStatus("unregistered");
        setSubscriptionStatus("unsubscribed");
        return;
      }

      setRegistrationStatus("registered");

      const existingSubscription =
        await registration.pushManager.getSubscription();

      setSubscription(existingSubscription);

      setSubscriptionStatus(
        existingSubscription ? "subscribed" : "unsubscribed",
      );
    };

    initialize();
  }, []);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Notifications are not supported");
      return;
    }

    const result = await Notification.requestPermission();

    setPermission(result);

    if (result === "granted") {
      toast.success("Notification permission granted");
    }

    if (result === "denied") {
      toast.error("Notification permission denied");
    }

    return result;
  };

  const registerServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) {
      setRegistrationStatus("unsupported");
      toast.error("Service workers are not supported");
      return null;
    }

    if (permission !== "granted") {
      toast.warning("Grant notification permission first");
      return null;
    }

    const registration = await navigator.serviceWorker.register("/sw.js");

    await navigator.serviceWorker.ready;

    setRegistrationStatus("registered");

    toast.success("Service worker registered");

    return registration;
  };

  const unregisterServiceWorker = async () => {
    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
      setRegistrationStatus("unregistered");
      return;
    }

    const existingSubscription =
      await registration.pushManager.getSubscription();

    if (existingSubscription) {
      await existingSubscription.unsubscribe();

      setSubscription(null);
      setSubscriptionStatus("unsubscribed");
    }

    await registration.unregister();

    setRegistrationStatus("unregistered");

    toast.success("Service worker unregistered");
  };

  const subscribeToPush = async () => {
    if (permission !== "granted") {
      toast.warning("Grant notification permission first");
      return null;
    }

    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
      toast.warning("Register the service worker first");
      return null;
    }

    const existingSubscription =
      await registration.pushManager.getSubscription();

    if (existingSubscription) {
      setSubscription(existingSubscription);
      setSubscriptionStatus("subscribed");

      toast.info("Push subscription already exists");

      return existingSubscription;
    }

    const newSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });

    const json = newSubscription.toJSON();

    if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) {
      toast.error("Invalid push subscription");
      throw new Error("Invalid push subscription");
    }

    await savePushSubscription({
      endpoint: json.endpoint,
      p256dh: json.keys.p256dh,
      auth: json.keys.auth,
    });

    setSubscription(newSubscription);
    setSubscriptionStatus("subscribed");

    toast.success("Push notifications subscribed");

    return newSubscription;
  };

  const unsubscribeFromPush = async () => {
    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
      setSubscriptionStatus("unsubscribed");
      return;
    }

    const existingSubscription =
      await registration.pushManager.getSubscription();

    if (!existingSubscription) {
      setSubscriptionStatus("unsubscribed");
      return;
    }

    await existingSubscription.unsubscribe();

    setSubscription(null);
    setSubscriptionStatus("unsubscribed");

    toast.success("Push subscription removed");
  };

  const sendTestNotification = async () => {
    if (permission !== "granted") {
      toast.error("Notification permission is not granted");
      return;
    }

    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
      toast.error("Service worker is not registered");
      return;
    }

    const notification = {
      title: "OILWISE",
      message: "Browser notifications are working!",
    };

    toast.info(notification.title, {
      description: notification.message,
    });

    await registration.showNotification(notification.title, {
      body: notification.message,
    });
  };

  return {
    permission,
    registrationStatus,
    subscriptionStatus,
    subscription,

    requestNotificationPermission,

    registerServiceWorker,
    unregisterServiceWorker,

    subscribeToPush,
    unsubscribeFromPush,

    sendTestNotification,
  };
};
