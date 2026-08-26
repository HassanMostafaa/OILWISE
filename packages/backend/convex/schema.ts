// configs
import { defineSchema } from "convex/server";

// tables
import { users } from "./tables/users/table";
import { numbers } from "./tables/numbers/table";
import { pushSubscriptions } from "./notifications/subscriptions/table";

export default defineSchema({
  users,
  numbers,
  pushSubscriptions,
});
