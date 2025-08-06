"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Zap } from "lucide-react";

interface BusinessImpact {
  userValue: string;
  marketGap: string;
  scalability: string;
}

interface ProjectImpactProps {
  businessImpact: BusinessImpact;
}

export default function ProjectImpact({ businessImpact }: ProjectImpactProps) {
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

  const impacts = [
    {
      title: "User Value",
      description: businessImpact.userValue,
      icon: Users,
      gradient: "from-blue-500/10 to-blue-600/10 border-blue-500/20",
      iconBg: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Market Gap",
      description: businessImpact.marketGap,
      icon: TrendingUp,
      gradient: "from-green-500/10 to-green-600/10 border-green-500/20",
      iconBg: "bg-green-500/10 text-green-600",
    },
    {
      title: "Scalability",
      description: businessImpact.scalability,
      icon: Zap,
      gradient: "from-purple-500/10 to-purple-600/10 border-purple-500/20",
      iconBg: "bg-purple-500/10 text-purple-600",
    },
  ];

  return (
    <section className="space-y-8">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl sm:text-4xl font-bold">Business Impact</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Real-world value and market positioning
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-3"
      >
        {impacts.map((impact, index) => {
          const Icon = impact.icon;
          return (
            <motion.div key={index} variants={fadeInUp}>
              <Card className={`group hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${impact.gradient} border`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${impact.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg">{impact.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {impact.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}