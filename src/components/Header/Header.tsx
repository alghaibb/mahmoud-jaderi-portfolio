import React from "react";
import Link from "next/link";
import Navbar from "./Navbar/Navbar";
import UserButton from "../UserButton";

import { auth } from "@/auth";
import { User } from "lucide-react";
import MobileNav from "./MobileNav/MobileNav";
import LogoLink from "../LogoLink";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="relative z-[999]">
      {/* Navbar */}
      <div className="fixed left-1/2 top-0 z-10 flex h-[4.5rem] w-full -translate-x-1/2 items-center justify-between border border-white border-opacity-40 bg-white px-4 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:border-black/40 dark:bg-gray-950 sm:top-6 sm:h-[3.5rem] sm:w-[58rem] sm:rounded-full">
        {/* Desktop Navbar */}
        <div className="hidden items-center justify-between md:flex">
          <div className="md:mr-2 md:px-7">
            <LogoLink />
          </div>
          <Navbar />
          <div className="ml-12">
            {user ? (
              <UserButton user={user} />
            ) : (
              <Link href="/login">
                <User className="h-6 w-6 text-primary/80 transition duration-200 ease-in-out hover:text-primary" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex w-full items-center justify-between md:hidden">
          <MobileNav />
          <div className="relative">
            {user ? (
              <UserButton user={user} />
            ) : (
              <Link href="/login">
                <User className="h-6 w-6 text-primary/80 transition duration-200 ease-in-out hover:text-primary" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
