"use client";

import { Button } from "@/components/ui/button";
import { socialLinks } from "@/lib/constants";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  textReveal,
} from "@/lib/animations";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import TypingSequence from "@/components/ui/typing-sequence";
import { ArrowDown, Download, Code2, Zap } from "lucide-react";
import { useRef } from "react";

// Simple background decoration
const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/3 rounded-full blur-3xl" />
    </div>
  );
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.8]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] sm:min-h-screen flex items-center py-16 sm:py-20 lg:py-32 overflow-hidden"
    >
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <BackgroundDecoration />

      {/* Main Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] lg:min-h-[500px]"
          >
            {/* Content */}
            <motion.div
              variants={staggerItem}
              className="space-y-6 lg:space-y-8 text-center lg:text-left"
            >
              {/* Status Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-primary/10 border border-primary/20 rounded-full text-xs sm:text-sm font-medium text-primary"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="hidden xs:inline">
                  Available for new opportunities
                </span>
                <span className="xs:hidden">Available for work</span>
              </motion.div>

              <motion.h1
                variants={textReveal}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
              >
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Mahmoud Jaderi
                </span>
              </motion.h1>

              <motion.div
                variants={textReveal}
                className="space-y-4 lg:space-y-6"
              >
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Full Stack Developer crafting{" "}
                  <span className="text-foreground font-semibold">
                    modern web applications
                  </span>{" "}
                  with cutting-edge technologies and exceptional user
                  experiences.
                </p>

                {/* Key Skills Highlight */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {["Next.js", "TypeScript", "React", "Node.js"].map(
                    (skill, index) => (
                      <motion.span
                        key={skill}
                        variants={fadeInUp}
                        custom={index}
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-muted/50 text-foreground text-xs sm:text-sm font-medium rounded-full border border-border/50"
                      >
                        {skill}
                      </motion.span>
                    )
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center lg:items-start min-h-[120px] sm:min-h-[60px]"
              >
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden"
                >
                  <Link href="/projects">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                      animate={{ x: [-100, 100] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                    <Code2 className="mr-2 h-5 w-5" />
                    View My Work
                    <motion.span
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>

                <Button variant="outline" size="lg" asChild className="group">
                  <Link href="/contact">
                    <Zap className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                    Get In Touch
                  </Link>
                </Button>

                <Button variant="ghost" size="lg" className="group">
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-3 gap-3 sm:gap-6 pt-4"
              >
                {[
                  { label: "Projects Built", value: "5+" },
                  { label: "Bootcamp Graduate", value: "2022" },
                  { label: "Technologies", value: "15+" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    custom={index}
                    className="text-center"
                  >
                    <div className="text-lg sm:text-2xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4"
              >
                <span className="text-sm text-muted-foreground text-center sm:text-left">
                  Connect with me:
                </span>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-300 border border-border/50 hover:border-primary/50 group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + 0.8 }}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Code Editor Mockup */}
            <motion.div variants={fadeInUp} className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-gradient-to-br from-card/90 to-muted/30 rounded-2xl p-6 border border-border/50 backdrop-blur-xl shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
                      <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
                    </div>
                    <span className="text-sm text-muted-foreground ml-2 font-medium">
                      developer.ts
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live
                  </div>
                </div>

                {/* Code Content */}
                <div className="space-y-3 font-mono text-sm h-[280px] sm:h-[320px] md:h-[360px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <TypingSequence
                    lines={[
                      "interface Developer {",
                      "  name: string;",
                      "  role: string;",
                      "  skills: string[];",
                      "  passion: string;",
                      "  status: 'Available' | 'Busy';",
                      "  location: string;",
                      "}",
                      "",
                      "const developer: Developer = {",
                      '  name: "Mahmoud Jaderi",',
                      '  role: "Full Stack Developer",',
                      '  skills: ["Next.js", "TypeScript", "React"],',
                      '  passion: "Building amazing apps",',
                      '  status: "Available",',
                      '  location: "Melbourne, Australia"',
                      "};",
                      "",
                      "// Ready to create something amazing?",
                    ]}
                    speed={25}
                    delayBetweenLines={200}
                    className="space-y-1"
                  />
                </div>

                {/* Code Highlights */}
                <div className="absolute top-20 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-1 text-xs text-primary font-medium">
                    TypeScript
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
}
