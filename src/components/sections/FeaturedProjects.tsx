"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { featuredProjects } from "@/lib/constants";
import {
  staggerContainer,
  staggerItem,
  cardHover,
  imageHover,
  buttonHover,
} from "@/lib/animations";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProjects() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in
            building modern web applications with cutting-edge technologies.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.title} variants={staggerItem}>
              <motion.div
                variants={cardHover}
                whileHover="hover"
                className="h-full"
              >
                <Card className="group h-full overflow-hidden border-0 bg-gradient-to-br from-background to-muted/20">
                  <div className="relative overflow-hidden">
                    <motion.div variants={imageHover} whileHover="hover">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mt-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                          +{project.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-muted text-xs font-medium rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <motion.div variants={buttonHover} whileHover="hover">
                        <Button asChild size="sm" className="group/btn">
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Demo
                            <ExternalLink className="ml-2 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonHover} whileHover="hover">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="group/btn"
                        >
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-3 w-3 group-hover/btn:scale-110 transition-transform" />
                            <span className="ml-2">Code</span>
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <motion.div variants={buttonHover} whileHover="hover">
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
