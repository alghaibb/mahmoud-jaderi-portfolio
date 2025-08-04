"use client";

import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import AboutValues from "./AboutValues";

export default function AnimatedAboutValues() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={staggerItem}>
        <AboutValues />
      </motion.div>
    </motion.div>
  );
} 