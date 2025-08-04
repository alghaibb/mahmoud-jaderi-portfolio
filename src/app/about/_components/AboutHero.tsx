import { aboutData } from "@/lib/constants";
import { MapPin, Clock, GraduationCap, Sparkles } from "lucide-react";

export default function AboutHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Full Stack Developer
          </div>

          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              {aboutData.name}
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {aboutData.tagline}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">{aboutData.location}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">
                {aboutData.background.experience} experience
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="font-medium">Certified Developer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
