import React from "react";
import Link from "next/link";

import { auth } from "@/auth";

import Navbar from "./Navbar/Navbar";
import UserButton from "../UserButton";

import { User } from "lucide-react";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex items-center p-4 mx-auto max-w-7xl">
      <Link href="/">
        <h1>Logo</h1>
      </Link>
      <Navbar />
      {user ? (
        <UserButton user={user} />
      ) : (
        <Link href="/login">
          <User className="duration-200 ease-in-out text-primary/80 hover:text-primary" />
        </Link>
      )}
    </header>
  );
};

export default Header;
