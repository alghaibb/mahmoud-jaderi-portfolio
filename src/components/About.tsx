"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import SectionHeading from "./ui/section-heading";

const About = () => {
  return (
    <motion.section
      className="mb-28 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>
      <p className="mb-3">
        After completing a{" "}
        <span className="font-medium">
          6-month full-stack web development bootcamp
        </span>
        , I decided to pursue my passion for programming.{" "}
        <span className="italic">My favorite part of programming</span> is the
        problem-solving aspect. I <span className="underline">love</span> the
        feeling of finally figuring out a solution to a problem. My core stack
        is{" "}
        <span className="font-medium">
          React, Next.js, Node.js, and MongoDB
        </span>
        . I am also familiar with{" "}
        <span className="font-medium">
          TypeScript, Prisma, GraphQL, and RESTful APIs
        </span>
        . I am always looking to learn new technologies. I am currently looking
        for a <span className="font-medium">full-time position</span> as a
        software developer.
      </p>

      <p>
        <span className="italic">
          <strong>When I&apos;m not coding</strong>
        </span>
        , I enjoy playing video games, watching movies, and learning to make my
        own video games. I am currently learning about{" "}
        <span className="font-medium">
          <strong>Unreal Engine 5 and C++</strong>
        </span>
        . I just finished a C++ course on Udemy by Stephen Ulibarri called{" "}
        <span className="font-medium">
          <strong>C++ Fundamentals: Game Programming For Beginners</strong>
        </span>
        . You can view and download my certificate{" "}
        <Link
          href="/cpp-udemy-certificate.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-500 underline"
          download={true}
        >
          here
        </Link>
        . I&apos;m currently learning his{" "}
        <span className="font-medium">
          <strong>
            Unreal Engine 5 C++ The Ultimate Game Developer Course
          </strong>
        </span>
        .
      </p>
    </motion.section>
  );
};

export default About;
