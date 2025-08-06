"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb, Zap } from "lucide-react";

interface ProjectOverviewProps {
  overview: string;
  challenge: string;
  solution: string;
}

export default function ProjectOverview({
  overview,
  challenge,
  solution,
}: ProjectOverviewProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2,
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
        <h2 className="text-3xl sm:text-4xl font-bold">Project Overview</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Understanding the problem, approach, and solution
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6"
      >
        <motion.div variants={fadeInUp}>
          <Card className="h-full border-0 bg-gradient-to-br from-background via-background to-primary/5 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {overview}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="h-full border-0 bg-gradient-to-br from-background via-background to-orange-500/5 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Challenge</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {challenge}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="h-full border-0 bg-gradient-to-br from-background via-background to-green-500/5 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <CardTitle className="text-xl">Solution</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {solution}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
