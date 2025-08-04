"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/sections/navbar/Navbar";
import Footer from "@/components/sections/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Hide navbar and footer on admin routes
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
