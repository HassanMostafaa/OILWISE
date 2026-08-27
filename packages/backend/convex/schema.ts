// configs
import { defineSchema } from "convex/server";

// tables
import { users } from "./tables/users/table";
import { numbers } from "./tables/numbers/table";
import { pushAlertsSubscriptions } from "./tables/push_alerts_subscriptions/table";

export default defineSchema({
  pushAlertsSubscriptions,
  users,
  numbers,
});
