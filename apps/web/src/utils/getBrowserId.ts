const BROWSER_ID_KEY = "oilwise_browser_id";

export const getBrowserId = () => {
  if (typeof window === "undefined") {
    return "";
  }

  let browserId = window.localStorage.getItem(BROWSER_ID_KEY);

  if (!browserId) {
    browserId = crypto.randomUUID();

    window.localStorage.setItem(BROWSER_ID_KEY, browserId);
  }

  if (browserId) return browserId;
  return "";
};
