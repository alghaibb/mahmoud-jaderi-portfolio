import About from "@/components/About";
import Intro from "@/components/Intro";
import SectionDivider from "@/components/ui/section-divider";

export default function Home() {
  return (
    <section className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
    </section>
  );
}
