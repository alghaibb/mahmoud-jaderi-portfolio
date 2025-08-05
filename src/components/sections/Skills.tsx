"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { skills } from "@/lib/constants";
import { staggerContainer, staggerItem, scaleInHover } from "@/lib/animations";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, TrendingUp } from "lucide-react";

// Enhanced skill data with proficiency levels
const enhancedSkills = [
  { name: "Next.js", level: 95, category: "Frontend", trending: true },
  { name: "TypeScript", level: 90, category: "Language", trending: true },
  { name: "React", level: 92, category: "Frontend", trending: false },
  { name: "Node.js", level: 85, category: "Backend", trending: false },
  { name: "PostgreSQL", level: 80, category: "Database", trending: false },
  { name: "Prisma", level: 88, category: "Backend", trending: true },
  { name: "Tailwind CSS", level: 95, category: "Styling", trending: false },
  { name: "Auth.js", level: 85, category: "Backend", trending: true },
];

const SkillMeter = ({
  skill,
  index,
}: {
  skill: (typeof enhancedSkills)[0];
  index: number;
}) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(skill.level);
      }, index * 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, skill.level, index]);

  return (
    <div
      ref={ref}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-background via-background to-muted/20 hover:from-primary/5 hover:to-primary/10 group-hover:scale-[1.02]">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header with Icon and Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <div className="w-5 h-5 bg-primary rounded-sm" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {skill.category}
                  </p>
                </div>
              </div>

              {skill.trending && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-green-500/10 text-green-600 border-green-500/20"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Hot
                </Badge>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Proficiency
                </span>
                <motion.span
                  className="text-sm font-medium text-primary"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    color: isHovered
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground))",
                  }}
                >
                  {progress}%
                </motion.span>
              </div>

              <div className="relative">
                <Progress value={progress} className="h-2 bg-muted/50" />
                {/* Animated glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 blur-sm"
                  animate={{
                    opacity: isHovered ? 0.6 : 0,
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Skill Level Description */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              className="text-xs text-muted-foreground"
            >
              {skill.level >= 90
                ? "Expert"
                : skill.level >= 80
                  ? "Advanced"
                  : skill.level >= 70
                    ? "Intermediate"
                    : "Learning"}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-muted/20 via-muted/30 to-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <Zap className="w-4 h-4" />
            Technical Expertise
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Core Skills & Technologies
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I specialize in building modern, scalable web applications using
            cutting-edge technologies. Here&apos;s my technical proficiency
            across different domains.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {enhancedSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <SkillMeter skill={skill} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Legacy Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Additional Expertise</h3>
            <p className="text-muted-foreground">
              Other technologies and tools I work with regularly
            </p>
          </div>

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
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20 group hover:from-primary/5 hover:to-primary/10">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                          <skill.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {skill.name}
                        </h3>
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
        </motion.div>
      </div>
    </section>
  );
}
