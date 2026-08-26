"use client";

import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useState } from "react";

export const PushNotificationTester = () => {
  const {
    permission,
    registrationStatus,
    enablePushNotifications,
    disablePushNotifications,
  } = usePushNotifications();

  const [requestPermission, setRequestPermission] = useState("default");

  return (
    <div className="space-y-3 border p-4">
      <p>
        Permission: <strong>{permission}</strong>
      </p>

      <p>
        Service worker: <strong>{registrationStatus}</strong>
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          className="border px-3 py-2"
          onClick={async () => {
            const { permission: enablePermission } =
              await enablePushNotifications();

            setRequestPermission(enablePermission);
          }}
        >
          Enable
          {requestPermission !== "default" && (
            <span> ({requestPermission})</span>
          )}
        </button>

        <button
          type="button"
          className="border px-3 py-2"
          onClick={disablePushNotifications}
        >
          Disable
        </button>
      </div>
    </div>
  );
};
