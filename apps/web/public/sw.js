self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};

  event.waitUntil(
    self.registration.showNotification(data.title ?? "OILWISE", {
      body: data.body ?? "New notification",
      icon: "/icon-192.png",
      badge: "/badge.png",
      data: {
        url: data.url ?? "/",
      },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow(event.notification.data?.url ?? "/"));
});
