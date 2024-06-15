import About from "@/components/About";
import Intro from "@/components/Intro";
import Skills from "@/components/Skills";
import Projects from "@/components/projects/Projects";
import SectionDivider from "@/components/ui/section-divider";

export default function Home() {
  return (
    <section className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
    </section>
  );
}
