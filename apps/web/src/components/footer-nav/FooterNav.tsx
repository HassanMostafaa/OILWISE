import Link from "next/link";

export const FooterNav = () => {
  return (
    <footer className="flex items-center justify-between  p-4 text-sm">
      <span>© {new Date().getFullYear()} OILWISE</span>

      <nav className="flex gap-4 [&>a]:underline">
        <Link href="/">Home</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </nav>
    </footer>
  );
};
