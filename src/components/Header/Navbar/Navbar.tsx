"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navbarLinks } from "@/constants";

import styles from "./index.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <nav className="hidden items-center justify-center md:flex">
      <ul className="flex flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-stone-500 sm:flex-nowrap sm:gap-10">
        {navbarLinks.map((link) => (
          <li key={link.link} className="flex items-center justify-center">
            <Link href={link.link}>
              <span
                className={`${styles.navItem} ${
                  activeLink === link.link ? styles.active : ""
                } flex w-full items-center justify-center duration-200 ease-in-out hover:text-primary`}
                onClick={() => setActiveLink(link.link)}
              >
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
