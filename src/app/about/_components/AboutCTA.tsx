import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <div className="py-20 text-center">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          I&apos;m always excited to work on new projects and bring ideas to life. 
          Let&apos;s discuss how we can create something amazing together.
        </p>
        <Button asChild size="lg">
          <Link href="/contact" className="group">
            Get In Touch
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
} 