"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Award, Users, Zap } from "lucide-react";

interface ProjectResultsProps {
  results: string[];
}

export default function ProjectResults({ results }: ProjectResultsProps) {
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

  const getIconForResult = (index: number) => {
    const icons = [TrendingUp, Award, Users, Zap];
    return icons[index % icons.length];
  };

  const getColorForResult = (index: number) => {
    const colors = ["blue", "green", "purple", "orange"];
    return colors[index % colors.length];
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
        <h2 className="text-3xl sm:text-4xl font-bold">Results & Impact</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Measurable outcomes and the positive impact of the solution
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {results.map((result, index) => {
          const Icon = getIconForResult(index);
          const color = getColorForResult(index);

          return (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full border-0 bg-gradient-to-br from-background via-background to-muted/20 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center space-y-4">
                  <div
                    className={`mx-auto w-12 h-12 rounded-full bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    {result}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center"
      >
        <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Project Success</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              This project successfully addressed the core challenges while
              delivering measurable improvements in user experience,
              performance, and business metrics. The solution demonstrates
              modern development practices and scalable architecture.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
