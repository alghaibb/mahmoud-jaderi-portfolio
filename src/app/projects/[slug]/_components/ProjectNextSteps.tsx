"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Rocket } from "lucide-react";

interface ProjectNextStepsProps {
  nextSteps: string[];
}

export default function ProjectNextSteps({ nextSteps }: ProjectNextStepsProps) {
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
        <h2 className="text-3xl sm:text-4xl font-bold">Future Enhancements</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Planned improvements and feature roadmap
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {nextSteps.map((step, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500/20 hover:border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <span className="text-sm font-semibold text-orange-600">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-foreground leading-relaxed">{step}</p>
                      <ArrowRight className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div variants={fadeInUp} className="mt-8">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Continuous Innovation</h3>
                  <p className="text-muted-foreground">
                    This project continues to evolve with new features and improvements based on user feedback and emerging technologies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}