"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Squash as Hamburger } from "hamburger-react";

import Logo from "../../../../public/logo.png";
import { navbarLinks } from "@/constants";

import styles from "./index.module.css";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Disable scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Close when user clicks outside the menu
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && !target.closest("nav")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <nav className="w-full md:hidden">
      <div className="relative flex items-center justify-between p-4">
        <Hamburger toggled={isOpen} toggle={handleToggle} size={24} />
        <div className="absolute left-1/2">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
      {isOpen && (
        <div
          className={`absolute left-0 right-0 top-[4.5rem] z-20 flex h-[100vh] w-full flex-col items-center bg-white shadow-md dark:bg-stone-950 dark:text-white ${styles["slide-down"]}`}
        >
          {navbarLinks.map((link) => (
            <Link key={link.link} href={link.link}>
              <span
                className="block w-full p-4 font-medium text-center"
                onClick={handleClose}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
