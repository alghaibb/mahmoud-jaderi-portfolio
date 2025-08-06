"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Grid3X3 } from "lucide-react";
import { allProjects } from "@/lib/constants";

interface ProjectNavigationProps {
  currentSlug: string;
}

export default function ProjectNavigation({
  currentSlug,
}: ProjectNavigationProps) {
  const currentIndex = allProjects.findIndex(
    (project) => project.slug === currentSlug
  );
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="border-t border-border/50 pt-12">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/projects" className="flex items-center gap-2">
              <Grid3X3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              View All Projects
            </Link>
          </Button>
        </div>

        {(prevProject || nextProject) && (
          <div className="grid md:grid-cols-2 gap-6">
            {prevProject ? (
              <Card className="group border-0 bg-gradient-to-br from-background via-background to-muted/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Link
                    href={`/projects/${prevProject.slug}`}
                    className="block space-y-3"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Previous Project
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {prevProject.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {prevProject.description}
                    </p>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Card className="group border-0 bg-gradient-to-br from-background via-background to-muted/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="block space-y-3"
                  >
                    <div className="flex items-center justify-end gap-2 text-muted-foreground text-sm">
                      Next Project
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors text-right">
                      {nextProject.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 text-right">
                      {nextProject.description}
                    </p>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div />
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}
