import { Show } from "@clerk/nextjs";
import Link from "next/link";

export const HomePage = () => {
  return (
    <main>
      <h1>
        Your vehicle data, Track your vehicle, manage its data, and keep the
        information that matters accessible from anywhere.
      </h1>

      <Show when="signed-out">
        <Link href="/sign-up">Get started</Link>
        <Link href="/sign-in">Sign in</Link>
      </Show>

      <Show when="signed-in">
        <Link href="/profile">Go to profile</Link>
      </Show>
    </main>
  );
};
