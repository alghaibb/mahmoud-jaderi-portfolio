"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import { useRouter } from "next/navigation";

const LogoLink = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    router.push("/");
  };

  return (
    <Link href="/" onClick={handleClick}>
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
