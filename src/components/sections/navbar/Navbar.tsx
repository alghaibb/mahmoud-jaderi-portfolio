"use client";

import { navLinks, socialLinks } from "@/lib/constants";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-primary via-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <span className="text-white font-bold text-base">M</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                CodeWithMJ
              </span>
              <div className="text-xs text-muted-foreground font-medium">
                Mahmoud Jaderi • Full Stack Developer
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg relative group hover:bg-muted/50",
                  pathname === link.href
                    ? "text-primary bg-primary/10 border border-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg" />
                )}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all group-hover:w-3/4" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>

            <div className="w-px h-6 bg-border/50" />
            <ModeToggle />
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <ModeToggle />
            <MobileNav socialLinks={socialLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
