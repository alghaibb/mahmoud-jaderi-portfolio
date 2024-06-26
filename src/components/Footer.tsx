import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="mb-10 flex w-full flex-col items-center justify-center border-t border-muted-foreground/40 px-4 py-6 text-stone-500">
      <small>&copy; {year} Mahmoud. All rights reserved.</small>
      <p className="mt-4 text-xs">
        Built with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
      </p>
    </footer>
  );
};

export default Footer;
