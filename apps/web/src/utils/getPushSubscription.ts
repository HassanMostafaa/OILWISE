// utils/getPushSubscription.ts

export const getPushSubscriptionFromBrowser = async () => {
  if (!("serviceWorker" in navigator)) {
    return null;
  }

  const registration = await navigator.serviceWorker.getRegistration();

  if (!registration) {
    return null;
  }

  return registration.pushManager.getSubscription();
};
