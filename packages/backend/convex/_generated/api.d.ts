/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth_getAuthenticatedUser from "../auth/getAuthenticatedUser.js";
import type * as notifications from "../notifications.js";
import type * as notifications_actions from "../notifications/actions.js";
import type * as notifications_api from "../notifications/api.js";
import type * as notifications_client from "../notifications/client.js";
import type * as notifications_internalQueries from "../notifications/internalQueries.js";
import type * as notifications_mutations from "../notifications/mutations.js";
import type * as notifications_subscriptions_mutations from "../notifications/subscriptions/mutations.js";
import type * as notifications_subscriptions_table from "../notifications/subscriptions/table.js";
import type * as tables_numbers_mutations from "../tables/numbers/mutations.js";
import type * as tables_numbers_queries from "../tables/numbers/queries.js";
import type * as tables_numbers_table from "../tables/numbers/table.js";
import type * as tables_users_mutations from "../tables/users/mutations.js";
import type * as tables_users_queries from "../tables/users/queries.js";
import type * as tables_users_table from "../tables/users/table.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "auth/getAuthenticatedUser": typeof auth_getAuthenticatedUser;
  notifications: typeof notifications;
  "notifications/actions": typeof notifications_actions;
  "notifications/api": typeof notifications_api;
  "notifications/client": typeof notifications_client;
  "notifications/internalQueries": typeof notifications_internalQueries;
  "notifications/mutations": typeof notifications_mutations;
  "notifications/subscriptions/mutations": typeof notifications_subscriptions_mutations;
  "notifications/subscriptions/table": typeof notifications_subscriptions_table;
  "tables/numbers/mutations": typeof tables_numbers_mutations;
  "tables/numbers/queries": typeof tables_numbers_queries;
  "tables/numbers/table": typeof tables_numbers_table;
  "tables/users/mutations": typeof tables_users_mutations;
  "tables/users/queries": typeof tables_users_queries;
  "tables/users/table": typeof tables_users_table;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  notification: import("convex-notification/_generated/component.js").ComponentApi<"notification">;
};
