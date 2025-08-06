import { Metadata } from "next";
import AnimatedAboutHero from "./_components/AnimatedAboutHero";
import AnimatedAboutBackground from "./_components/AnimatedAboutBackground";
import AnimatedAboutTimeline from "./_components/AnimatedAboutTimeline";
import AnimatedAboutValues from "./_components/AnimatedAboutValues";
import AnimatedAboutCTA from "./_components/AnimatedAboutCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about CodeWithMJ - Mahmoud Jaderi's journey as a full-stack developer, my expertise, and what drives me to create exceptional web applications.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AnimatedAboutHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedAboutBackground />
        <AnimatedAboutTimeline />
        <AnimatedAboutValues />
        <AnimatedAboutCTA />
      </div>
    </div>
  );
}
