"use client";

import { motion } from "motion/react";
import AboutHero from "./AboutHero";

export default function AnimatedAboutHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <AboutHero />
    </motion.div>
  );
} 