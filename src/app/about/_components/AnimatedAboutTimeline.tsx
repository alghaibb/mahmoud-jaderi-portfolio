"use client";

import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import AboutTimeline from "./AboutTimeline";

export default function AnimatedAboutTimeline() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={staggerItem}>
        <AboutTimeline />
      </motion.div>
    </motion.div>
  );
} 