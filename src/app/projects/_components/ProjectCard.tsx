"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { cardHover, imageHover, buttonHover } from "@/lib/animations";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    image: string;
    demoLink: string;
    githubLink: string;
    features: string[];
    category: string;
    featured: boolean;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div variants={cardHover} whileHover="hover" className="group">
      <Card className="h-full overflow-hidden border-border/50 hover:border-primary/50 transition-colors duration-300">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.div variants={imageHover} className="h-full w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.div>

          {/* Overlay with badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            {project.featured && (
              <Badge
                variant="secondary"
                className="bg-primary text-primary-foreground"
              >
                Featured
              </Badge>
            )}
            <Badge
              variant="outline"
              className="bg-background/80 backdrop-blur-sm"
            >
              {project.category}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.tech.length - 4} more
              </Badge>
            )}
          </div>

          {/* Features */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Key Features:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {project.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {feature}
                </li>
              ))}
              {project.features.length > 3 && (
                <li className="text-xs text-muted-foreground/70">
                  +{project.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <motion.div variants={buttonHover} className="flex-1">
              <Button asChild size="sm" className="w-full">
                <Link
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Link>
              </Button>
            </motion.div>
            <motion.div variants={buttonHover}>
              <Button asChild size="sm" variant="outline">
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Link>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
