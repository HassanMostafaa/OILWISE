import { Show } from "@clerk/nextjs";
import Link from "next/link";

export const HomePage = () => {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <section className="w-full max-w-3xl space-y-8">
        <div className="space-y-4">
          <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
            OILWISE
          </span>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Your vehicle data,
            <br />
            all in one place.
          </h1>

          <p className="max-w-xl text-lg text-gray-500">
            Track your vehicle, manage its data, and keep the information that
            matters accessible from anywhere.
          </p>
        </div>

        <Show when="signed-out">
          <div className="flex gap-3">
            <Link
              href="/sign-up"
              className="border bg-foreground px-5 py-2.5 text-background"
            >
              Get started
            </Link>

            <Link href="/sign-in" className="border px-5 py-2.5">
              Sign in
            </Link>
          </div>
        </Show>

        <Show when="signed-in">
          <Link
            href="/profile"
            className="inline-block border bg-foreground px-5 py-2.5 text-background"
          >
            Go to profile
          </Link>
        </Show>
      </section>
    </main>
  );
};
