"use client";

import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface MobileNavProps {
  socialLinks: SocialLink[];
}

export function MobileNav({ socialLinks }: MobileNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-muted/50 rounded-md transition-colors relative group">
          <Menu className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[320px] sm:w-[380px] p-0 bg-background/95 backdrop-blur-sm border-l border-border"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center text-background font-bold text-sm">
                M
              </div>
              <span className="sr-only">Mobile Menu</span>
            </div>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">
              {/* Navigation Links */}
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Navigation
                </h3>
                <nav className="space-y-1">
                  {navLinks.map((link, index) => (
                    <SheetTrigger asChild key={link.href}>
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 group relative overflow-hidden",
                          pathname === link.href
                            ? "text-primary bg-primary/10 border border-primary/20"
                            : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                        )}
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <span className="relative z-10">{link.label}</span>
                        {pathname === link.href && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </SheetTrigger>
                  ))}
                </nav>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Connect
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-200 group border border-transparent hover:border-primary/20"
                      style={{
                        animationDelay: `${(index + navLinks.length) * 50}ms`,
                      }}
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <social.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* User Sign In */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Account
                </h3>
                <SheetTrigger asChild>
                  <Link
                    href="/sign-in"
                    onClick={handleLinkClick}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full"
                    )}
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Sign In</span>
                  </Link>
                </SheetTrigger>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} Mahmoud Jaderi
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
