export const ROLES = {
  Admin: "admin",
  User: "user",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const isRole = (value: unknown): value is Role => {
  return Object.values(ROLES).some((role) => role === value);
};
