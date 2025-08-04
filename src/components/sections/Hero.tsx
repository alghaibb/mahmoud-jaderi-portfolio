"use client";

import { Button } from "@/components/ui/button";
import { socialLinks } from "@/lib/constants";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  textReveal,
} from "@/lib/animations";
import { motion } from "motion/react";
import Link from "next/link";
import TypingSequence from "@/components/ui/typing-sequence";

export default function Hero() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div variants={staggerItem} className="space-y-8">
            <motion.h1
              variants={textReveal}
              className="text-4xl lg:text-6xl font-bold leading-tight"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Mahmoud Jaderi
              </span>
            </motion.h1>

            <motion.p
              variants={textReveal}
              className="text-xl lg:text-2xl text-muted-foreground leading-relaxed"
            >
              Full Stack Developer crafting modern web applications with
              cutting-edge technologies and exceptional user experiences.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="group">
                <Link href="/projects">
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
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex items-center gap-6"
            >
              <span className="text-sm text-muted-foreground">Follow me:</span>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Code Editor Mockup with Typing Effect */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-6 border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  portfolio.tsx
                </span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <TypingSequence
                  lines={[
                    "const developer = {",
                    '  name: "Mahmoud Jaderi",',
                    '  role: "Full Stack Developer",',
                    '  passion: "Building amazing apps"',
                    "};",
                  ]}
                  speed={80}
                  delayBetweenLines={800}
                  className="space-y-1"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
