"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSectionInView } from "@/hooks/use-selection-in-view";
import SectionHeading from "./ui/section-heading";

const About = () => {
  const { ref } = useSectionInView("About Me", 0.5);

  return (
    <motion.section
      ref={ref}
      id="about"
      className="mb-28 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About Me</SectionHeading>
      <p className="mb-3">
        After completing a{" "}
        <span className="font-medium">
          comprehensive 6-month full-stack web development bootcamp
        </span>
        , I decided to fully embrace my passion for programming.{" "}
        <span className="italic">
          The aspect of programming that I find most rewarding
        </span>{" "}
        is the problem-solving. I derive great satisfaction from finding
        solutions to complex problems. My core technical stack includes{" "}
        <span className="font-medium">
          React, Next.js, Node.js, and MongoDB
        </span>
        . Additionally, I possess a solid understanding of{" "}
        <span className="font-medium">
          TypeScript, Prisma, GraphQL, and RESTful APIs
        </span>
        . I am continually seeking to expand my knowledge and proficiency in new
        technologies. I am currently pursuing a{" "}
        <span className="font-medium">full-time position</span> as a software
        developer.
      </p>

      <p>
        <span className="italic">
          <strong>Outside of coding</strong>
        </span>
        , I enjoy playing video games, watching movies, and learning how to
        develop my own video games. I am currently gaining expertise in{" "}
        <span className="font-medium">
          <strong>Unreal Engine 5 and C++</strong>
        </span>
        . I recently completed a C++ course on Udemy by Stephen Ulibarri, titled{" "}
        <span className="font-medium">
          <strong>C++ Fundamentals: Game Programming For Beginners</strong>
        </span>
        . You can view and download my certificate{" "}
        <Link
          href="/cpp-udemy-ceritficate.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-500 underline"
          download={true}
        >
          here
        </Link>
        . Currently, I am enrolled in another course by Stephen Ulibarri,{" "}
        <span className="font-medium">
          <strong>
            Unreal Engine 5 C++: The Ultimate Game Developer Course
          </strong>
        </span>
        .
      </p>
    </motion.section>
  );
};

export default About;
