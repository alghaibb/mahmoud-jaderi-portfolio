"use client";

import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import AboutBackground from "./AboutBackground";

export default function AnimatedAboutBackground() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={staggerItem}>
        <AboutBackground />
      </motion.div>
    </motion.div>
  );
} 