import { cn } from "@/lib/utils";
import { env } from "@/lib/env";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/sections/navbar/Navbar";
import Footer from "@/components/sections/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Mahmoud Jaderi",
    absolute: "Mahmoud Jaderi | Full Stack Developer",
  },
  description: "Modern web apps built with Next.js, TypeScript, and clean UI.",
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  openGraph: {
    title: "Mahmoud Jaderi | Full Stack Developer",
    description:
      "Modern web apps built with Next.js, TypeScript, and clean UI.",
    url: env.NEXT_PUBLIC_BASE_URL,
    siteName: "Mahmoud Jaderi Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Jaderi | Full Stack Developer",
    description:
      "Modern web apps built with Next.js, TypeScript, and clean UI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-background text-foreground")}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster closeButton theme="light" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
