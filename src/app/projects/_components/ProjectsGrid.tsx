"use client";

import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import ProjectCard from "./ProjectCard";

interface ProjectsGridProps {
  projects: Array<{
    title: string;
    slug: string;
    description: string;
    tech: string[];
    image: string;
    demoLink: string;
    githubLink: string;
    features: string[];
    category: string;
    featured: boolean;
    year: number;
  }>;
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-muted-foreground">
            No projects found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
    >
      {projects.map((project) => (
        <motion.div
          key={project.title}
          variants={staggerItem}
          className="h-full"
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
