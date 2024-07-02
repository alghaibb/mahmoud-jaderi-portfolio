import React from "react";
import { ThemeToggle } from "./ui/theme-toggle";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="flex flex-col items-center justify-between w-full px-4 py-6 mt-10 border-t border-muted-foreground/40 text-stone-500 dark:border-primary dark:text-primary">
      <small>&copy; {year} Mahmoud. All rights reserved.</small>
      <p className="mt-4 text-xs">
        Built with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
      </p>
      <div className="mt-4">
        <ThemeToggle />
      </div>
    </footer>
  );
};

export default Footer;
