"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProjectHero from "./ProjectHero";
import ProjectOverview from "./ProjectOverview";
import ProjectChallenges from "./ProjectChallenges";
import ProjectTechStack from "./ProjectTechStack";
import ProjectResults from "./ProjectResults";
import ProjectLearnings from "./ProjectLearnings";
import ProjectImpact from "./ProjectImpact";
import ProjectNextSteps from "./ProjectNextSteps";
// import ProjectGallery from "./ProjectGallery";
import ProjectNavigation from "./ProjectNavigation";

interface Project {
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
  caseStudy?: {
    overview: string;
    challenge: string;
    solution: string;
    keyLearnings?: string[];
    businessImpact?: {
      userValue: string;
      marketGap: string;
      scalability: string;
    };
    nextSteps?: string[];
    techDetails: Record<string, string | undefined>;
    challenges: Array<{
      title: string;
      description: string;
      solution: string;
    }>;
    results: string[];
    gallery: Array<{
      image: string;
      caption: string;
    }>;
  };
}

interface ProjectCaseStudyProps {
  project: Project;
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="group flex-shrink-0"
            >
              <Link
                href="/projects"
                className="flex items-center gap-1 sm:gap-2"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back to Projects</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>

            <div className="flex items-center gap-2  md:gap-3">
              {project.demoLink && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="flex-shrink-0"
                >
                  <Link
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 sm:gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">Live Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </Link>
                </Button>
              )}
              <Button asChild size="sm" className="flex-shrink-0">
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 sm:gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">GitHub</span>
                  <span className="sm:hidden">Code</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <ProjectHero project={project} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-4 justify-center"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{project.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <Badge variant="outline">{project.category}</Badge>
          </div>
          {project.featured && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
              ⭐ Featured Project
            </Badge>
          )}
        </motion.div>

        {project.caseStudy ? (
          <>
            <ProjectOverview
              overview={project.caseStudy.overview}
              challenge={project.caseStudy.challenge}
              solution={project.caseStudy.solution}
            />

            <ProjectTechStack
              techDetails={project.caseStudy.techDetails}
              technologies={project.tech}
            />

            <ProjectChallenges challenges={project.caseStudy.challenges} />

            <ProjectResults results={project.caseStudy.results} />

            {project.caseStudy.keyLearnings && (
              <ProjectLearnings keyLearnings={project.caseStudy.keyLearnings} />
            )}

            {project.caseStudy.businessImpact && (
              <ProjectImpact businessImpact={project.caseStudy.businessImpact} />
            )}

            {project.caseStudy.nextSteps && (
              <ProjectNextSteps nextSteps={project.caseStudy.nextSteps} />
            )}

            {/* <ProjectGallery gallery={project.caseStudy.gallery} /> */}
          </>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Project Details</h2>
                <p className="text-muted-foreground mb-6">
                  {project.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Key Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => (
                        <Badge key={index} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <ProjectNavigation currentSlug={project.slug} />
      </div>
    </div>
  );
}
