import React from "react";
import { navbarLinks } from "@/constants";

import styles from "./index.module.css";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center w-full p-4">
      <ul className="flex items-center space-x-4">
        {navbarLinks.map((link) => (
          <li key={link.name}>
            <a href={link.link} className={styles.navItem}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
