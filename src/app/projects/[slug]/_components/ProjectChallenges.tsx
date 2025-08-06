"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface Challenge {
  title: string;
  description: string;
  solution: string;
}

interface ProjectChallengesProps {
  challenges: Challenge[];
}

export default function ProjectChallenges({
  challenges,
}: ProjectChallengesProps) {
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
        <h2 className="text-3xl sm:text-4xl font-bold">
          Challenges & Solutions
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Key technical challenges encountered and how they were overcome
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-6"
      >
        {challenges.map((challenge, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="border-0 bg-gradient-to-br from-background via-background to-muted/20 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  {challenge.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    The Challenge
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                <div className="border-l-4 border-green-500/30 pl-4 bg-green-500/5 py-3 rounded-r">
                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded bg-green-500/10">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        The Solution
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {challenge.solution}
                      </p>
                    </div>
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
