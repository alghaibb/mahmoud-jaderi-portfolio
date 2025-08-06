import { cn } from "@/lib/utils";
import { env } from "@/lib/env";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import StructuredData from "@/components/seo/StructuredData";
import { PWAInstall } from "@/components/ui/pwa-install";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Mahmoud Jaderi - CodeWithMJ",
    default: "CodeWithMJ | Mahmoud Jaderi - Full Stack Developer",
  },
  description:
    "CodeWithMJ - Mahmoud Jaderi, experienced Full Stack Developer specializing in Next.js, TypeScript, and React. Building modern, scalable web applications with exceptional user experiences. Available for hire in Melbourne, Australia.",
  keywords: [
    "codewithmj",
    "CodeWithMJ",
    "Code With MJ",
    "Mahmoud Jaderi",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Web Developer Melbourne",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "Prisma",
    "PostgreSQL",
    "Tailwind CSS",
    "Modern Web Development",
    "Responsive Design",
    "PWA Development",
    "API Development",
    "Database Design",
    "UI/UX Development",
    "Freelance Developer",
    "CodeWithMJ Portfolio",
    "MJ Developer",
  ],
  authors: [{ name: "Mahmoud Jaderi", url: env.NEXT_PUBLIC_BASE_URL }],
  creator: "Mahmoud Jaderi",
  publisher: "Mahmoud Jaderi",
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  alternates: {
    canonical: env.NEXT_PUBLIC_BASE_URL,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MJ Portfolio",
    startupImage: [
      {
        url: "/icon-192x192.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: env.NEXT_PUBLIC_BASE_URL,
    siteName: "Mahmoud Jaderi - Full Stack Developer Portfolio",
    title: "Mahmoud Jaderi | Full Stack Developer - Modern Web Applications",
    description:
      "Experienced Full Stack Developer specializing in Next.js, TypeScript, and React. Building modern, scalable web applications with exceptional user experiences.",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Mahmoud Jaderi - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Jaderi | Full Stack Developer",
    description:
      "Building modern web applications with Next.js, TypeScript, and React. Available for hire in Melbourne, Australia.",
    images: ["/twitter-image.jpg"], // You'll need to add this image
    creator: "@mahmoudjaderi", // Update with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <meta name="application-name" content="MJ Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MJ Portfolio" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#1e40af" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icon-192x192.png" color="#1e40af" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={cn(inter.className, "bg-background text-foreground")}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster closeButton theme="light" richColors />
          <PWAInstall />
        </ThemeProvider>
      </body>
    </html>
  );
}
