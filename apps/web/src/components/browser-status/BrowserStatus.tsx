"use client";

import { useUpdatePushAlertActiveState } from "@/services/push-alert-subscriptions/hooks/updatePushAlertActiveState";
import { useDeletePushAlertSubscription } from "@/services/push-alert-subscriptions/hooks/useDeletePushAlertSubscription";
import { useSavePushAlertSubscription } from "@/services/push-alert-subscriptions/hooks/useSavePushAlertSubscription";
import { getBrowserId } from "@/utils/getBrowserId";
import { urlBase64ToUint8Array } from "@/utils/urlBase64ToUint8Array";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const BrowserStatus = () => {
  const [registration, setRegistration] = useState<
    ServiceWorkerRegistration | null | undefined
  >(null);

  const [subscription, setSubscription] = useState<
    PushSubscription | null | undefined
  >(null);

  const [permission, setPermission] = useState<NotificationPermission>(() =>
    typeof Notification !== "undefined" ? Notification.permission : "default",
  );

  // TO BE USED UPON SUBSCRIBING
  const savePushAlertSubscription = useSavePushAlertSubscription();
  const deletePushAlertSubscription = useDeletePushAlertSubscription();
  const updatePushAlertActiveState = useUpdatePushAlertActiveState();

  const registerServiceWorker = async () => {
    const registration = await navigator.serviceWorker?.getRegistration();
    setRegistration(registration);
  };

  const unregisterServiceWorker = async () => {
    // if (!registration) return;
    await unSubscribeToPushNotifications();
    await registration?.unregister();
    setRegistration(null);
  };

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    setPermission(permission);
  };

  const subscribeToPushNotifications = async () => {
    if (permission !== "granted") {
      toast.error(
        "Browser notifications must be enabled to receive push notifications",
      );
      await requestNotificationPermission();

      return;
    }
    if (!registration) {
      toast.error("Service worker is not registered");
      return;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "",
      ),
    });

    setSubscription(subscription);
    if (subscription) {
      await savePushAlertSubscription({
        browserId: getBrowserId(),
        subscription: subscription.toJSON(),
      });
    }
  };

  const unSubscribeToPushNotifications = async () => {
    if (!subscription) return;
    await subscription.unsubscribe();
    await deletePushAlertSubscription({ browserId: getBrowserId() });
    setSubscription(null);
  };

  // SETTING REGISTER AND SUBSCRIPTION
  useEffect(() => {
    (async () => {
      await registerServiceWorker();

      const subscription = await registration?.pushManager.getSubscription();
      setSubscription(subscription);
    })();
  }, []);

  return (
    <div className="border space-y-10 p-5">
      <div>
        <p>Service worker registration: {JSON.stringify(!!registration)}</p>
        {registration && (
          <pre className="border p-2 bg-gray-900">
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
        {registration && (
          <button className="click" onClick={unregisterServiceWorker}>
            Unregister
          </button>
        )}
      </div>
      <hr />
      <p className="flex flex-col gap-2">
        Permission: {JSON.stringify(permission)}{" "}
        {permission === "default" && (
          <button className="click" onClick={requestNotificationPermission}>
            Ask permission
          </button>
        )}
      </p>

      <hr />

      <p>Push manager: {JSON.stringify("PushManager" in window)}</p>

      <hr />
      <div>
        <p className="flex flex-col gap-2">
          Push subscription:
          {!subscription && (
            <button className="click" onClick={subscribeToPushNotifications}>
              Subscribe
            </button>
          )}
        </p>

        {subscription && (
          <pre>{JSON.stringify(subscription.toJSON(), null, 2)}</pre>
        )}

        {subscription && (
          <button className="click" onClick={unSubscribeToPushNotifications}>
            Unsubscribe
          </button>
        )}
        {subscription && (
          <button
            className="click"
            onClick={async () => {
              await updatePushAlertActiveState({
                browserId: getBrowserId(),
                active: true,
              });
            }}
          >
            Activate
          </button>
        )}
        {subscription && (
          <button
            className="click"
            onClick={async () => {
              await updatePushAlertActiveState({
                browserId: getBrowserId(),
                active: false,
              });
            }}
          >
            Disable
          </button>
        )}
      </div>
    </div>
  );
};
