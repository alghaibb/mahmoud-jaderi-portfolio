"use client";

import React from "react";
import Link from "next/link";
import { navbarLinks } from "@/constants";
import { useActiveSectionContext } from "@/context/active-section-context";
import clsx from "clsx";

const Navbar = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <nav className="items-center justify-center hidden md:flex">
      <ul className="flex flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-stone-500 sm:flex-nowrap sm:gap-10">
        {navbarLinks.map((link) => (
          <li key={link.link} className="flex items-center justify-center">
            <Link
              className={clsx(
                "flex w-full items-center justify-center px-3 py-3 transition hover:text-stone-950 dark:hover:text-stone-300",
                {
                  "text-stone-950 dark:text-stone-200":
                    activeSection === link.name,
                },
              )}
              href={link.link}
              onClick={() => {
                setActiveSection(link.name);
                setTimeOfLastClick(Date.now());
              }}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
