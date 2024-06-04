import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Mahmoud Jaderi's Portfolio",
    absolute: "Mahmoud Jaderi's Portfolio",
  },
  description:
    "Mahmoud Jaderi's Portfolio. A full-stack web developer with a passion for building modern websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Navbar />
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
