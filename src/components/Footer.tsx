import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="mb-10 px-4 text-center text-stone-500">
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
