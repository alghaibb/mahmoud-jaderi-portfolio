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
import Image from "next/image";

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Picture Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-start order-2 lg:order-1"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary/10 rounded-full blur-sm animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary/5 rounded-full blur-md animate-pulse delay-1000" />

            {/* Profile Picture Container */}
            <div className="relative group">
              {/* Outer Ring */}
              <div className="absolute -inset-3 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-full animate-spin-slow opacity-75" />

              {/* Middle Ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-background to-muted rounded-full" />

              {/* Profile Picture */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                <Image
                  src="/me.jpg"
                  alt="Mahmoud Jaderi - Full Stack Developer"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-2 -right-2 bg-background border-4 border-background rounded-full shadow-lg">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Available
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="text-center lg:text-left space-y-8 order-1 lg:order-2">
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
    </div>
  );
}
