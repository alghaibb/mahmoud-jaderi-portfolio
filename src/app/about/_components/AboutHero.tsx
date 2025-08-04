"use client";

import { aboutData } from "@/lib/constants";
import {
  MapPin,
  Clock,
  GraduationCap,
  Sparkles,
  Code2,
  Target,
  Heart,
} from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

export default function AboutHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-12">
          {/* Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-medium backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <Sparkles className="h-4 w-4" />
            Full Stack Developer & Bootcamp Graduate
          </motion.div>

          {/* Enhanced Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-foreground via-primary to-primary/60 bg-clip-text text-transparent">
              {aboutData.name}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {aboutData.tagline}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              Recent bootcamp graduate with a passion for creating modern,
              scalable web applications. Ready to bring fresh ideas and
              enthusiasm to your next project.
            </p>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6"
          >
            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-base">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden xs:inline">{aboutData.location}</span>
              <span className="xs:hidden">Melbourne</span>
            </Badge>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-base">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden sm:inline">
                2+ years learning journey
              </span>
              <span className="sm:hidden">2+ years</span>
            </Badge>
            <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-base">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden sm:inline">Bootcamp Certified</span>
              <span className="sm:hidden">Certified</span>
            </Badge>
            <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20 px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-base">
              <Code2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden xs:inline">5+ Projects Built</span>
              <span className="xs:hidden">5+ Projects</span>
            </Badge>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">My Goal</h3>
                  <p className="text-muted-foreground">
                    {aboutData.journey.goal}
                  </p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">My Expertise</h3>
                  <p className="text-muted-foreground">
                    {aboutData.expertise.preferred}
                  </p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">My Passion</h3>
                  <p className="text-muted-foreground">
                    {aboutData.interests.motivation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
