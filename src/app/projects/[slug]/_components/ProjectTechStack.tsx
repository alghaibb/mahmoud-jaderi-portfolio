"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Server, Palette, Shield, Zap } from "lucide-react";

interface ProjectTechStackProps {
  techDetails: Record<string, string | undefined>;
  technologies: string[];
}

export default function ProjectTechStack({
  techDetails,
  technologies,
}: ProjectTechStackProps) {
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

  const getIconForCategory = (category: string) => {
    const key = category.toLowerCase();
    if (
      key.includes("frontend") ||
      key.includes("ui") ||
      key.includes("design")
    )
      return Palette;
    if (
      key.includes("backend") ||
      key.includes("server") ||
      key.includes("api")
    )
      return Server;
    if (key.includes("database") || key.includes("storage")) return Database;
    if (key.includes("auth") || key.includes("security")) return Shield;
    if (key.includes("realtime") || key.includes("performance")) return Zap;
    return Code2;
  };

  const getColorForCategory = (category: string) => {
    const key = category.toLowerCase();
    if (
      key.includes("frontend") ||
      key.includes("ui") ||
      key.includes("design")
    )
      return "purple";
    if (
      key.includes("backend") ||
      key.includes("server") ||
      key.includes("api")
    )
      return "blue";
    if (key.includes("database") || key.includes("storage")) return "green";
    if (key.includes("auth") || key.includes("security")) return "red";
    if (key.includes("realtime") || key.includes("performance"))
      return "yellow";
    return "gray";
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
          Technical Architecture
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Deep dive into the technologies and architectural decisions
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold mb-6">Implementation Details</h3>
          {Object.entries(techDetails)
            .filter(([_, description]) => description)
            .map(([category, description], index) => {
              const Icon = getIconForCategory(category);
              const color = getColorForCategory(category);

              return (
                <motion.div key={category} variants={fadeInUp}>
                  <Card className="border-0 bg-gradient-to-br from-background via-background to-muted/20 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg bg-${color}-500/10 border border-${color}-500/20`}
                        >
                          <Icon className={`w-5 h-5 text-${color}-600`} />
                        </div>
                        <CardTitle className="text-lg capitalize">
                          {category}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {description}
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
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold">Technology Stack</h3>

          <Card className="border-0 bg-gradient-to-br from-background via-background to-primary/5">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold">Core Technologies</h4>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2"
                >
                  {technologies.map((tech, index) => (
                    <motion.div key={tech} variants={fadeInUp}>
                      <Badge
                        variant="secondary"
                        className="text-sm bg-muted hover:bg-primary/10 transition-colors cursor-default"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-background via-background to-muted/10">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4">Architecture Highlights</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Modern, scalable architecture with separation of concerns
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Type-safe development with comprehensive TypeScript
                    integration
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Optimized performance with lazy loading and caching
                    strategies
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Responsive design with mobile-first approach</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
