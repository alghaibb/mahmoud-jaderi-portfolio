import { cn } from "@/lib/utils";
import { env } from "@/lib/env";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import StructuredData from "@/components/seo/StructuredData";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Mahmoud Jaderi - Full Stack Developer",
    default: "Mahmoud Jaderi | Full Stack Developer - Modern Web Applications",
  },
  description:
    "Experienced Full Stack Developer specializing in Next.js, TypeScript, and React. Building modern, scalable web applications with exceptional user experiences. Available for hire in Melbourne, Australia.",
  keywords: [
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
  ],
  authors: [{ name: "Mahmoud Jaderi", url: env.NEXT_PUBLIC_BASE_URL }],
  creator: "Mahmoud Jaderi",
  publisher: "Mahmoud Jaderi",
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  alternates: {
    canonical: env.NEXT_PUBLIC_BASE_URL,
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
      </head>
      <body className={cn(inter.className, "bg-background text-foreground")}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster closeButton theme="light" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
