"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";

const LogoLink = () => {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link href="#" onClick={handleScrollToTop}>
      <Image
        src={Logo}
        alt="Logo"
        width={40}
        height={40}
        className="cursor-pointer"
      />
    </Link>
  );
};

export default LogoLink;
