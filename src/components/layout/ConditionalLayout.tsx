"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/sections/navbar/Navbar";
import Footer from "@/components/sections/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Hide navbar and footer for admin pages
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdminPage && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdminPage && <Footer />}
    </div>
  );
}
