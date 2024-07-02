import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header/Header";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { checkAdminAccess } from "@/utils/admin";
import AdminBanner from "@/components/AdminBanner";

import "./globals.css";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Mahmoud Jaderi's Portfolio",
    absolute: "Mahmoud Jaderi's Portfolio",
  },
  description:
    "Mahmoud Jaderi's Portfolio. A full-stack web developer with a passion for building modern websites.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { hasAccess, email } = await checkAdminAccess();

  const adminEmail = email ?? "";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} relative bg-stone-50 pt-28 text-primary dark:bg-stone-900 dark:text-white/90 sm:pt-36`}
      >
        <div className="absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] dark:bg-[#946263] sm:w-[68.75rem]"></div>
        <div className="absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-[#dbd7fb] blur-[10rem] dark:bg-[#676394] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveSectionContextProvider>
            {hasAccess && <AdminBanner email={adminEmail} />}
            <Header />

            {children}
            <Toaster />
            <Footer />
          </ActiveSectionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
