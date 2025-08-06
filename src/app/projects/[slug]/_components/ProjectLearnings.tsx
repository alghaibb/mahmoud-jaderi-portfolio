"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface ProjectLearningsProps {
  keyLearnings: string[];
}

export default function ProjectLearnings({ keyLearnings }: ProjectLearningsProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="space-y-8">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl sm:text-4xl font-bold">Key Learnings</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Skills and knowledge gained through this project
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-4 md:gap-6"
      >
        {keyLearnings.map((learning, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground leading-relaxed">{learning}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}