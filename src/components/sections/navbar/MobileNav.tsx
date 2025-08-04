"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
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
        <button className="p-2 hover:bg-muted/50 rounded-lg transition-all duration-200 relative group border border-transparent hover:border-border/50">
          <Menu className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[350px] p-0 bg-background/95 backdrop-blur-xl border-l border-border/50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-primary via-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base">M</span>
              </div>
              <div>
                <span className="font-bold text-lg">Mahmoud Jaderi</span>
                <div className="text-xs text-muted-foreground">
                  Full Stack Developer
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Navigation
                </h3>
                <nav className="space-y-2">
                  {navLinks.map((link, _index) => (
                    <SheetTrigger asChild key={link.href}>
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 group relative",
                          pathname === link.href
                            ? "text-primary bg-primary/10 border border-primary/20 shadow-sm"
                            : "text-foreground hover:text-primary hover:bg-muted/50 border border-transparent hover:border-border/50"
                        )}
                      >
                        <span className="relative z-10">{link.label}</span>
                        {pathname === link.href && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl" />
                        )}
                        <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
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
                  {socialLinks.map((social, _index) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 text-foreground hover:text-primary hover:bg-muted/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-border/50"
                    >
                      <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors shadow-sm">
                        <social.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border/50 bg-muted/10">
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Mahmoud Jaderi
              </p>
              <p className="text-xs text-muted-foreground">
                Full Stack Developer
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
