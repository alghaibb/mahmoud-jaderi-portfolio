import {
  quickLinks,
  legalLinks,
  technologies,
  socialLinks,
  contactInfo,
} from "@/lib/constants";
import Link from "next/link";
import { Mail, MapPin, Calendar, Code2, Heart, ArrowUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-background via-muted/20 to-muted/40 border-t border-border/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">MJ</span>
                </div>
                <div>
                  <h3 className="font-bold text-2xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    CodeWithMJ
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Mahmoud Jaderi • Full Stack Developer
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed max-w-md">
                Passionate bootcamp graduate crafting modern web applications
                with cutting-edge technologies. Ready to bring fresh ideas and
                dedication to your next project.
              </p>
            </div>

            {/* Enhanced Social Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Connect With Me
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 rounded-xl bg-muted/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
                <Button variant="ghost" size="lg" className="group" asChild>
                  <Link
                    href="/mahmoud-jaderi-resume.pdf"
                    download="mahmoud-jaderi-resume.pdf"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="text-lg font-bold text-primary">5+</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="text-lg font-bold text-primary">15+</div>
                <div className="text-xs text-muted-foreground">
                  Technologies
                </div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="text-lg font-bold text-primary">2022</div>
                <div className="text-xs text-muted-foreground">Graduate</div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">
                Navigation
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">
                Contact
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Melbourne, Australia</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-green-600 font-medium">
                    {contactInfo.availability}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-gradient-to-r from-muted/50 to-muted/30 text-xs font-medium rounded-full border border-border/30 hover:border-primary/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
                <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                  +{technologies.length - 6} more
                </span>
              </div>
            </div>

            {/* Back to Top */}
            <div className="pt-4">
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="sm"
                className="w-full group border-border/50 hover:border-primary/50 hover:bg-primary/5"
              >
                <ArrowUp className="h-4 w-4 mr-2 group-hover:-translate-y-1 transition-transform" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                <span>
                  © {new Date().getFullYear()} Mahmoud Jaderi. All rights
                  reserved.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>Built with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>using Next.js & TypeScript</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Portfolio v2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
