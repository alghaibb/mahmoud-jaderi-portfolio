"use client";

import { Button } from "@/components/ui/button";
import {
  staggerContainer,
  staggerItem,
  buttonHover,
} from "@/lib/animations";
import { motion } from "motion/react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <motion.div variants={staggerItem} className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's work together to bring your ideas to life. I'm always
              excited to take on new challenges and create something amazing.
            </p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div variants={buttonHover} whileHover="hover">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Start a Project
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
            </motion.div>
            <motion.div variants={buttonHover} whileHover="hover">
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
