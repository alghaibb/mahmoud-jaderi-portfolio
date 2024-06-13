import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar/Navbar";
import UserButton from "../UserButton";
import Logo from "../../../public/logo.png";

import { auth } from "@/auth";
import { User } from "lucide-react";
import MobileNav from "./MobileNav/MobileNav";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="relative z-[999] w-full">
      <div className="fixed left-1/2 top-0 z-10 flex h-[4.5rem] w-full -translate-x-1/2 items-center justify-between border border-white border-opacity-40 bg-white bg-opacity-80 px-4 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.5rem] sm:w-[46rem] sm:rounded-full">
        {/* Desktop Navbar */}
        <div className="items-center justify-between hidden w-full md:flex">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
          <Navbar />
          {user ? (
            <UserButton user={user} />
          ) : (
            <Link href="/login">
              <User className="w-6 h-6 transition duration-200 ease-in-out text-primary/80 hover:text-primary" />
            </Link>
          )}
        </div>

        {/* Mobile Navbar */}
        <div className="items-center justify-between w-full md:hidden">
          <MobileNav />
        </div>
        {/* Mobile User Icon */}
        <div className="md:hidden">
          {user ? (
            <UserButton user={user} />
          ) : (
            <Link href="/login">
              <User className="w-6 h-6 transition duration-200 ease-in-out text-primary/80 hover:text-primary" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
