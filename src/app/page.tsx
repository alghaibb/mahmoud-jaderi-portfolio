import About from "@/components/About";
import Experience from "@/components/Experience";
import Intro from "@/components/Intro";
import Skills from "@/components/Skills";
import Projects from "@/components/projects/Projects";
import SectionDivider from "@/components/ui/section-divider";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />
    </main>
  );
}
