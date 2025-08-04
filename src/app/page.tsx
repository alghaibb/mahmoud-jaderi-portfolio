import CTA from "@/components/sections/CTA";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      <FeaturedProjects />
      <CTA />
    </div>
  );
}
