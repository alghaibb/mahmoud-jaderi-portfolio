"use client";

import React from "react";
import SectionHeading from "./ui/section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experience } from "@/constants";
import { useSectionInView } from "@/hooks/use-selection-in-view";

const Experience = () => {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="mb-28 scroll-mt-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline>
        {experience.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              visible={true}
              contentStyle={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
                boxShadow: "none",
              }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(33, 150, 243)",
              }}
              date={item.date}
              iconStyle={{
                fontSize: "1.5rem",
                background: "rgba(255, 255, 255, 0.15)",
              }}
              icon={item.icon}
            >
              <h3 className="font-semibold caption-top">{item.title}</h3>
              <p className="!mt-0 font-normal">{item.school}</p>
              <p className="!mt-1 !font-normal text-stone-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
};

export default Experience;
