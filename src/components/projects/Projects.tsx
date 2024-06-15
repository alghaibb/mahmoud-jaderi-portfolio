"use client";

import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import Project from "./Project";
import { projects } from "@/constants/index";
import { useSectionInView } from "@/hooks/use-selection-in-view";

const Projects = () => {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <section ref={ref} id="projects" className="mb-28 scroll-mt-28">
      <SectionHeading>My projects</SectionHeading>
      <div>
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Projects;
