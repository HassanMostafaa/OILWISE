self.addEventListener("push", (event) => {
  let data = {
    title: "OILWISE",
    body: "New notification",
    url: "/",
    action: null,
  };

  if (event.data) {
    try {
      data = {
        ...data,
        ...event.data.json(),
      };
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      data: {
        url: data.url,
        action: data.action,
      },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const href = event.notification.data?.action?.href ?? "/";

  event.waitUntil(clients.openWindow(href));
});
