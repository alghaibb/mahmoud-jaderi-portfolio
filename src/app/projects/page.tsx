import { Metadata } from "next";
import ProjectsPageClient from "./_components/ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of modern web applications built with Next.js, TypeScript, and React. Each project showcases different technologies, problem-solving approaches, and development best practices from a recent bootcamp graduate.",
  keywords: [
    "web development projects",
    "Next.js portfolio",
    "TypeScript applications",
    "React projects",
    "full-stack development",
    "bootcamp graduate portfolio",
    "modern web applications",
    "JavaScript projects",
  ],
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
