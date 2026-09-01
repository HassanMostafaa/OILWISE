"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useUpdatePushAlertActiveState } from "@/services/push-alert-subscriptions/hooks/updatePushAlertActiveState";
import { useDeletePushAlertSubscription } from "@/services/push-alert-subscriptions/hooks/useDeletePushAlertSubscription";
import { useGetPushSubscriptionStatus } from "@/services/push-alert-subscriptions/hooks/useGetPushSubscriptionStatus";
import { useSavePushAlertSubscription } from "@/services/push-alert-subscriptions/hooks/useSavePushAlertSubscription";

import { getBrowserId } from "@/utils/getBrowserId";
import { urlBase64ToUint8Array } from "@/utils/urlBase64ToUint8Array";

export const BrowserStatus = () => {
  const [browserId, setBrowserId] = useState<string | null>(null);

  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  const savePushAlertSubscription = useSavePushAlertSubscription();

  const deletePushAlertSubscription = useDeletePushAlertSubscription();

  const updatePushAlertActiveState = useUpdatePushAlertActiveState();

  const subscriptionStatus = useGetPushSubscriptionStatus(browserId);

  // useEffect(() => {
  //   console.log({ subscriptionStatus });
  // }, [subscriptionStatus]);

  const isSubscribed = subscriptionStatus?.data?.isSubscribed ?? false;

  // --------------------------------------------------
  // INITIAL BROWSER STATE
  // --------------------------------------------------

  useEffect(() => {
    const initialize = async () => {
      const registration = await navigator.serviceWorker?.getRegistration();

      setBrowserId(getBrowserId());
      setRegistration(registration ?? null);
      setPermission(Notification.permission);
    };

    void initialize();
  }, []);

  // --------------------------------------------------
  // SERVICE WORKER
  // --------------------------------------------------

  const registerServiceWorker = async () => {
    const registration = await navigator.serviceWorker.register("/sw.js");

    setRegistration(registration);
  };

  const unregisterServiceWorker = async () => {
    if (!registration) return;

    await unsubscribeFromPushNotifications();

    await registration.unregister();

    setRegistration(null);
  };

  // --------------------------------------------------
  // PERMISSION
  // --------------------------------------------------

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    setPermission(permission);

    return permission;
  };

  // --------------------------------------------------
  // PUSH SUBSCRIPTION
  // --------------------------------------------------

  const subscribeToPushNotifications = async () => {
    if (!registration || !browserId) {
      toast.error("Service worker is not registered");
      return;
    }

    let currentPermission = Notification.permission;

    if (currentPermission !== "granted") {
      currentPermission = await requestNotificationPermission();
    }

    if (currentPermission !== "granted") {
      return;
    }

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,

        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "",
        ),
      });
    }

    await savePushAlertSubscription({
      browserId,
      subscription: subscription.toJSON(),
    });

    toast.success("Push notifications enabled");
  };

  const unsubscribeFromPushNotifications = async () => {
    if (!registration || !browserId) return;

    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
    }

    await deletePushAlertSubscription({
      browserId,
    });

    toast.success("Push notifications disabled");
  };

  // --------------------------------------------------
  // ACTIVE STATE
  // --------------------------------------------------

  const updateActiveState = async (active: boolean) => {
    if (!browserId || !registration) return;

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "",
        ),
      });
    }

    await updatePushAlertActiveState({
      browserId,
      active,
      subscription: subscription.toJSON(),
    });
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <article>
      <div>
        <p>Browser ID: {browserId ?? "Loading..."}</p>

        <p>
          Service worker registration:{" "}
          {registration ? "Registered" : "Not registered"}
        </p>

        {registration && (
          <pre>
            {JSON.stringify(
              {
                scope: registration.scope,
                active: registration.active?.state,
                installing: registration.installing?.state,
                waiting: registration.waiting?.state,
                updateViaCache: registration.updateViaCache,
              },
              null,
              2,
            )}
          </pre>
        )}

        {/* {!registration ? (
          <button className="click" onClick={registerServiceWorker}>
            Register
          </button>
        ) : (
          <button className="click" onClick={unregisterServiceWorker}>
            Unregister
          </button>
        )} */}
      </div>

      <p>Permission: {permission}</p>

      {permission === "default" && (
        <button className="click" onClick={requestNotificationPermission}>
          Ask permission
        </button>
      )}

      <p>Push subscription: {isSubscribed ? "Subscribed" : "Not subscribed"}</p>

      {!isSubscribed && (
        <button className="click" onClick={subscribeToPushNotifications}>
          Subscribe
        </button>
      )}

      {isSubscribed && (
        <>
          <button className="click" onClick={unsubscribeFromPushNotifications}>
            Unsubscribe
          </button>

          <button className="click" onClick={() => updateActiveState(true)}>
            Activate
          </button>

          <button className="click" onClick={() => updateActiveState(false)}>
            Disable
          </button>
        </>
      )}
    </article>
  );
};
