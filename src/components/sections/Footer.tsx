import {
  quickLinks,
  legalLinks,
  technologies,
  socialLinks,
  contactInfo,
} from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl">Mahmoud Jaderi</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full Stack Developer crafting modern web applications with
              cutting-edge technologies and exceptional user experiences.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="font-semibold">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-muted text-xs font-medium rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Get In Touch */}
          <div className="space-y-4">
            <h3 className="font-semibold">Get In Touch</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                {contactInfo.availability}
              </p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-primary hover:underline transition-colors block"
              >
                {contactInfo.email}
              </a>
              <p className="text-muted-foreground">{contactInfo.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mahmoud Jaderi. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
