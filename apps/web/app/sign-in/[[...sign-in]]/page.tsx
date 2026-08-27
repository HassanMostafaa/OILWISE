import { SignInPage } from "@/page/sign-in-page/SignInPage";
import { getPushSubscriptionFromBrowser } from "@/utils/getPushSubscription";

export default async function NextjsPage() {
  const subscription = await getPushSubscriptionFromBrowser();

  return <SignInPage subscription={subscription} />;
}
