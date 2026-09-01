// actions.ts

"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const revokeSession = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const sessionId = formData.get("sessionId");

  if (typeof sessionId !== "string") {
    throw new Error("Invalid session ID");
  }

  const client = await clerkClient();

  const session = await client.sessions.getSession(sessionId);

  if (session.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await client.sessions.revokeSession(sessionId);

  revalidatePath("/profile");
};
