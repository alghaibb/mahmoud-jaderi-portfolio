"use client";

import React from "react";
import SectionHeading from "./ui/section-heading";
import { skills } from "@/constants";
import { motion } from "framer-motion";
import { useSectionInView } from "@/hooks/use-selection-in-view";

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * index },
  }),
};

const Skills = () => {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
      ref={ref}
      id="skills"
    >
      <SectionHeading>My Skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-stone-800">
        {skills.map((skill, index) => (
          <motion.li
            className="rounded-xl border border-stone-900/[0.1] bg-stone-100 px-5 py-3"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
