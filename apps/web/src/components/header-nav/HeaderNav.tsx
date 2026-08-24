import { Show } from "@clerk/nextjs";
import Link from "next/link";
import { SignOut } from "../sign-out/SignOut";

export const HeaderNav = () => {
  return (
    <div className="flex gap-4 border-b  items-center [&>a]:underline">
      <Show when={"signed-in"}>Signed in</Show>
      <Show when={"signed-out"}>Signed out</Show>

      <Link href="/">/Home</Link>

      <a href="/tester" rel="noopener noreferrer">
        Tester
      </a>

      <Show when={"signed-out"}>
        <a href="/sign-in" rel="noopener noreferrer">
          Sign in
        </a>
        <a href="/sign-up" rel="noopener noreferrer">
          Sign up
        </a>
      </Show>

      <Show when={"signed-in"}>
        <SignOut />
      </Show>
    </div>
  );
};
