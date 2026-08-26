// configs
import { defineSchema } from "convex/server";

// tables
import { users } from "./tables/users/table";
import { numbers } from "./tables/numbers/table";
import { pushNotificationsSubscriptions } from "./tables/push_notifications_subscriptions/table";

export default defineSchema({
  users,
  numbers,
  pushNotificationsSubscriptions,
});
