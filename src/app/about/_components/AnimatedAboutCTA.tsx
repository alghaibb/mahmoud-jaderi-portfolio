"use client";

import { motion } from "motion/react";
import AboutCTA from "./AboutCTA";

export default function AnimatedAboutCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <AboutCTA />
    </motion.div>
  );
} 