"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { cardHover, imageHover } from "@/lib/animations";

interface ProjectCardProps {
  project: {
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
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      variants={cardHover}
      whileHover="hover"
      className="group h-full"
    >
      <Card className="h-full overflow-hidden border-0 bg-gradient-to-br from-background via-background to-muted/20 hover:shadow-2xl transition-all duration-500 relative">
        {/* Project Image */}
        <div className="relative h-52 overflow-hidden">
          <motion.div variants={imageHover} className="h-full w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>

          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {project.featured && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg w-fit">
                  ⭐ Featured
                </Badge>
              </motion.div>
            )}
            <Badge
              variant="outline"
              className="bg-background/90 backdrop-blur-sm border-white/20 text-foreground w-fit"
            >
              {project.category}
            </Badge>
          </div>

          {/* Year Badge */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge
              variant="outline"
              className="bg-background/90 backdrop-blur-sm border-white/20 text-foreground text-xs"
            >
              {project.year}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                {project.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Active
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Enhanced Tech Stack */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center">
                <span className="text-primary text-xs">⚡</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Tech Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs bg-muted hover:bg-primary/10 transition-colors"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
              {project.tech.length > 4 && (
                <Badge variant="outline" className="text-xs border-dashed">
                  +{project.tech.length - 4}
                </Badge>
              )}
            </div>
          </div>

          {/* Enhanced Features */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center">
                <span className="text-primary text-xs">✨</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Key Features
              </span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1.5">
              {project.features.slice(0, 3).map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{feature}</span>
                </motion.li>
              ))}
              {project.features.length > 3 && (
                <li className="text-xs text-muted-foreground/70 pl-3.5">
                  +{project.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="space-y-2 pt-2">
            {/* Primary Action - Case Study */}
            <Button
              asChild
              size="sm"
              className="w-full group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link href={`/projects/${project.slug}`}>
                <span className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform">
                  📖
                </span>
                View Case Study
              </Link>
            </Button>

            {/* Secondary Actions */}
            <div className="flex gap-2">
              {project.demoLink && (
                <div className="flex-1">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5"
                  >
                    <Link
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Link>
                  </Button>
                </div>
              )}
              <div className={project.demoLink ? "flex-shrink-0" : "w-full"}>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={`${project.demoLink ? "" : "w-full"} border-border/50 hover:border-primary/50 hover:bg-primary/5`}
                >
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
}
