"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  Code2,
  Rocket,
  GraduationCap,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";

const experiences = [
  {
    id: 1,
    type: "milestone",
    title: "Curiosity Sparked",
    company: "",
    location: "",
    period: "2022",
    duration: "",
    status: "completed",
    description:
      "Discovered a passion for web development and began learning by experimenting with templates and tutorials.",
    achievements: [],
    technologies: [],
    icon: Code2,
    color: "blue",
  },
  {
    id: 2,
    type: "education",
    title: "Formal Learning",
    company: "",
    location: "",
    period: "2023",
    duration: "",
    status: "completed",
    description:
      "Completed a 6-month full-time web development bootcamp, gaining hands-on experience in both frontend and backend technologies.",
    achievements: [],
    technologies: [],
    icon: GraduationCap,
    color: "green",
  },
  {
    id: 3,
    type: "project",
    title: "Project-Based Learning",
    company: "",
    location: "",
    period: "2024",
    duration: "",
    status: "completed",
    description:
      "Built real-world full-stack applications using Next.js, Prisma, and modern development tools to solidify core skills.",
    achievements: [],
    technologies: [],
    icon: Briefcase,
    color: "purple",
  },
  {
    id: 4,
    type: "milestone",
    title: "Sharpening the Craft",
    company: "",
    location: "",
    period: "2025",
    duration: "",
    status: "current",
    description:
      "Focused on refining best practices, writing clean code, and mastering advanced concepts in preparation for professional work.",
    achievements: [],
    technologies: [],
    icon: Rocket,
    color: "orange",
  },
  {
    id: 5,
    type: "milestone",
    title: "Professional Growth",
    company: "",
    location: "",
    period: "2026",
    duration: "",
    status: "current",
    description:
      "Building a professional portfolio and seeking new opportunities in the industry to further develop my skills and contribute to impactful projects.",
    achievements: [],
    technologies: [],
    icon: TrendingUp,
    color: "red",
  },
];

const stats = [
  { label: "Projects Built", value: "5+", icon: Code2 },
  { label: "Technologies Learned", value: "15+", icon: Award },
  { label: "Learning Journey", value: "2+ yrs", icon: TrendingUp },
  { label: "Ready to Contribute", value: "100%", icon: Users },
];

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "education":
        return GraduationCap;
      case "project":
        return Briefcase;
      case "milestone":
        return Rocket;
      default:
        return Briefcase;
    }
  };

  const TypeIcon = getTypeIcon(experience.type);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
      }
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      {/* Timeline Line */}
      <div className="absolute left-8 top-16 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />

      {/* Timeline Dot */}
      <div className="absolute left-6 top-12 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg hidden md:block" />

      <Card className="ml-0 md:ml-16 group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-background via-background to-muted/20 hover:from-primary/5 hover:to-primary/10">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg bg-${experience.color}-500/10 border border-${experience.color}-500/20`}
                >
                  <TypeIcon
                    className={`w-5 h-5 text-${experience.color}-600`}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {experience.title}
                  </h3>
                  <p className="text-primary font-medium">
                    {experience.company}
                  </p>
                </div>
              </div>

              <Badge className={getStatusColor(experience.status)}>
                {experience.status === "current" ? "Current" : "Completed"}
              </Badge>
            </div>

            {/* Meta Information - Only show if data exists */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{experience.period}</span>
              </div>
              {experience.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              )}
              {experience.duration && (
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 flex items-center justify-center">
                    ⏱
                  </span>
                  <span>{experience.duration}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {experience.description}
            </p>

            {/* Achievements - Only show if there are achievements */}
            {experience.achievements.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {experience.achievements.map(
                    (achievement, achievementIndex) => (
                      <motion.li
                        key={achievementIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -20 }
                        }
                        transition={{
                          delay: index * 0.2 + achievementIndex * 0.1,
                        }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </motion.li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Technologies - Only show if there are technologies */}
            {experience.technologies.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      transition={{ delay: index * 0.2 + techIndex * 0.05 }}
                      className="px-3 py-1 bg-muted hover:bg-primary/10 text-xs font-medium rounded-full border border-border/50 hover:border-primary/30 transition-all cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const StatsCard = ({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20 group hover:from-primary/5 hover:to-primary/10">
        <div className="space-y-3">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <stat.icon className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      </Card>
    </motion.div>
  );
};

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(-45deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <Briefcase className="w-4 h-4" />
            Professional Journey
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Experience & Growth
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My journey in web development, from learning the fundamentals to
            building complex, scalable applications with modern technologies.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <StatsCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
