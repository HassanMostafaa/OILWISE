"use client";

import { usePushNotifications } from "@/hooks/usePushNotifications";

export const PushNotificationTester = () => {
  const {
    permission,
    registrationStatus,
    subscriptionStatus,

    requestNotificationPermission,

    registerServiceWorker,
    unregisterServiceWorker,

    subscribeToPush,
    unsubscribeFromPush,

    sendTestNotification,
  } = usePushNotifications();

  return (
    <div className="space-y-6 border p-4">
      <section className="space-y-2 border p-3">
        <h2 className="font-semibold">1. Browser permission</h2>

        <p>
          Permission: <strong>{permission}</strong>
        </p>

        <button
          type="button"
          className="border px-3 py-2"
          disabled={permission === "granted"}
          onClick={requestNotificationPermission}
        >
          Request permission
        </button>
      </section>

      <section className="space-y-2 border p-3">
        <h2 className="font-semibold">2. Service worker</h2>

        <p>
          Status: <strong>{registrationStatus}</strong>
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            className="border px-3 py-2"
            disabled={
              permission !== "granted" || registrationStatus === "registered"
            }
            onClick={registerServiceWorker}
          >
            Register
          </button>

          <button
            type="button"
            className="border px-3 py-2"
            disabled={registrationStatus !== "registered"}
            onClick={unregisterServiceWorker}
          >
            Unregister
          </button>
        </div>
      </section>

      <section className="space-y-2 border p-3">
        <h2 className="font-semibold">3. Push subscription</h2>

        <p>
          Status: <strong>{subscriptionStatus}</strong>
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            className="border px-3 py-2"
            disabled={
              permission !== "granted" ||
              registrationStatus !== "registered" ||
              subscriptionStatus === "subscribed"
            }
            onClick={subscribeToPush}
          >
            Subscribe
          </button>

          <button
            type="button"
            className="border px-3 py-2"
            disabled={subscriptionStatus !== "subscribed"}
            onClick={unsubscribeFromPush}
          >
            Unsubscribe
          </button>
        </div>
      </section>

      <section className="space-y-2 border p-3">
        <h2 className="font-semibold">Test notification</h2>

        <button
          type="button"
          className="border px-3 py-2"
          disabled={
            permission !== "granted" || registrationStatus !== "registered"
          }
          onClick={sendTestNotification}
        >
          Send test notification
        </button>
      </section>
    </div>
  );
};
