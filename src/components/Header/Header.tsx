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
      <div className="fixed left-1/2 top-0 z-10 flex h-[4.5rem] w-full -translate-x-1/2 items-center justify-between border border-white border-opacity-40 bg-white px-4 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:border-black/40 dark:bg-gray-950 sm:top-6 sm:h-[3.5rem] sm:w-[48rem] sm:rounded-full">
        {/* Desktop Navbar */}
        <div className="items-center justify-between hidden md:flex">
          <div className="md:mr-2 md:px-7">
            <LogoLink />
          </div>
          <Navbar />
          <div className="absolute right-0 md:right-3">
            {user ? (
              <UserButton user={user} />
            ) : (
              <Link href="/login">
                <User className="w-6 h-6 transition duration-200 ease-in-out text-primary/80 hover:text-primary" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex items-center justify-between w-full md:hidden">
          <MobileNav />
          <div className="relative">
            {user ? (
              <UserButton user={user} />
            ) : (
              <Link href="/login">
                <User className="w-6 h-6 transition duration-200 ease-in-out text-primary/80 hover:text-primary" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
