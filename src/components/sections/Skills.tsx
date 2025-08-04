"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { skills } from "@/lib/constants";
import { staggerContainer, staggerItem, scaleInHover } from "@/lib/animations";
import { motion } from "motion/react";

export default function Skills() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold">Core Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I specialize in building modern web applications with cutting-edge
            technologies and best practices.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={staggerItem}>
              <motion.div
                variants={scaleInHover}
                whileHover="hover"
                className="h-full"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <skill.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{skill.name}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
