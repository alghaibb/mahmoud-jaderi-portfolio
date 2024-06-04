import Link from "next/link";

export default function Navbar() {
  // TODO: Show the currently logged-in user

  return (
    <header className="sticky top-0 px-3 shadow-sm bg-background">
      <nav className="flex items-center justify-between w-full gap-3 mx-auto h-14 max-w-7xl">
        <Link href="/" className="font-bold">
          Next-Auth v5 Tutorial
        </Link>
      </nav>
    </header>
  );
}
