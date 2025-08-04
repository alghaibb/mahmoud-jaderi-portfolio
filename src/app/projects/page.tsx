import { Metadata } from "next";
import ProjectsPageClient from "./_components/ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of web applications, from full-stack platforms to AI-powered tools. Each project showcases different technologies and problem-solving approaches.",
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
