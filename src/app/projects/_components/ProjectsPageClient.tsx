"use client";

import { Button } from "@/components/ui/button";
import { allProjects } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState, useMemo } from "react";
import ProjectFilters from "./ProjectFilters";
import ProjectsGrid from "./ProjectsGrid";

export default function ProjectsPageClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold">My Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of web applications, from full-stack platforms
            to AI-powered tools. Each project showcases different technologies
            and problem-solving approaches.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <ProjectFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredProjectsCount={filteredProjects.length}
        />

        {/* Projects Grid */}
        <ProjectsGrid projects={filteredProjects} />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I&apos;m always excited to work on new projects and bring ideas to
              life. Let&apos;s discuss how we can create something amazing
              together.
            </p>
            <Button asChild size="lg">
              <Link href="/contact" className="group">
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 