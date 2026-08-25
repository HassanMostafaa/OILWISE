import { mutation } from "../../_generated/server";
import { v } from "convex/values";

type UserRole = "user" | "admin";

export const registerUserProfile = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    username: v.string(),
  },

  handler: async (ctx, args) => {
    const { email, name, username } = args || {};
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) =>
        q.eq("clerkUserId", identity.subject),
      )
      .unique();

    if (existingUser) {
      throw new Error("User profile already exists");
    }

    return ctx.db.insert("users", {
      clerkUserId: identity.subject,
      username,
      email,
      name,
    });
  },
});

export const deleteUserById = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (context, args) => {
    return context.db.delete(args.userId);
  },
});

export const ensureUserProfile = mutation({
  args: {},

  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const username =
      typeof identity.username === "string" ? identity.username : "";

    const email = typeof identity.email === "string" ? identity.email : "";

    const name = typeof identity.name === "string" ? identity.name : undefined;

    const hasImg =
      typeof identity.has_img === "boolean" ? identity.has_img : false;

    const imgUrl =
      typeof identity.img_url === "string" ? identity.img_url : undefined;

    const metadata =
      typeof identity.metadata === "object" &&
      identity.metadata !== null &&
      !Array.isArray(identity.metadata)
        ? identity.metadata
        : {};

    const role: UserRole = metadata.role === "admin" ? "admin" : "user";

    const profile = {
      clerkUserId: identity.subject,
      username,
      email,
      name,
      has_img: hasImg,
      img_url: imgUrl,
      role,
    };

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) =>
        q.eq("clerkUserId", identity.subject),
      )
      .unique();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, profile);

      return existingUser._id;
    }

    return ctx.db.insert("users", profile);
  },
});
