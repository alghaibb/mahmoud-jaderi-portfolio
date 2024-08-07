import React from "react";
import { StaticImageData } from "next/image";

import { Sumz, AlHaya, AuthStarter } from "@/assets/projects/index";

import { LuGraduationCap } from "react-icons/lu";
import { date } from "zod";

export const navbarLinks = [
  { name: "Home", link: "#home" },
  { name: "About Me", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "/contact" },
] as const;

export const experience = [
  {
    title: "Coding Bootcamp",
    school: "Monash Univesity",
    description: "Graduated from an intensive six-month coding bootcamp, mastering the basics of full-stack web development",
    icon: React.createElement(LuGraduationCap),
    date: "",
  }
] as const;

export type Project = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: StaticImageData;
  githubUrl: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Sumz: AI Article Summarizer",
    description: "Sumz is a web app that uses AI to summarize articles and help you save time.",
    tags: ["React", "Vite", "Tailwind CSS", "Redux"],
    imageUrl: Sumz,
    githubUrl: "https://github.com/alghaibb/ai-summarizer",
    liveUrl: "https://ai-summarizer-xi-lilac.vercel.app/",
  },
  {
    title: "Al Haya: E-commerce Website",
    description: "Al Haya is an e-commerce website that sells islamic products.",
    tags: ["React", "Vite", "GraphQL", "MongoDB", "Sanity CMS", "TypeScript", "Tailwind CSS", "Zod", "Stripe"],
    imageUrl: AlHaya,
    githubUrl: "https://github.com/alghaibb/al-haya",
    liveUrl: "https://al-haya-73td.vercel.app/",
  },
  {
    title: "Next.js Auth Starter",
    description: "A starter template for Next.js with authentication.",
    tags: ["Next.js", "Auth.js", "Tailwind CSS", "Zod", "Prisma", "TypeScript", "Shadcn UI", "Server Actions"],
    imageUrl: AuthStarter,
    githubUrl: "https://github.com/alghaibb/nextjs-auth-starter",
  }
] as const;

export const skills = [
  "HTML",
  "CSS",
  "Bootstrap",
  "SASS",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Mongoose",
  "Prisma",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "GraphQL",
  "RESTful APIs",
  "Redux",
  "Git",
  "Apollo",
] as const;

