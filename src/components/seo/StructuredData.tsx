import { env } from "@/lib/env";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mahmoud Jaderi",
    jobTitle: "Full Stack Developer",
    description:
      "Experienced Full Stack Developer specializing in Next.js, TypeScript, and React. Building modern, scalable web applications with exceptional user experiences.",
    url: env.NEXT_PUBLIC_BASE_URL,
    image: `${env.NEXT_PUBLIC_BASE_URL}/profile-image.jpg`,
    sameAs: [
      "https://github.com/alghaibb",
      "https://linkedin.com/in/mahmoud-jaderi",
      // Add your actual social media URLs
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
      "Web Development",
      "API Development",
      "Database Design",
      "Responsive Design",
      "PWA Development",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Web Development Bootcamp",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Full Stack Developer",
      occupationLocation: {
        "@type": "City",
        name: "Melbourne, Australia",
      },
      skills: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Tailwind CSS",
      ],
    },
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CodeWithMJ - Mahmoud Jaderi Portfolio",
    alternateName: ["Code With MJ", "MJ Developer", "Mahmoud Jaderi Portfolio"],
    description:
      "CodeWithMJ - Portfolio website showcasing full stack development projects and skills by Mahmoud Jaderi",
    url: env.NEXT_PUBLIC_BASE_URL,
    author: {
      "@type": "Person",
      name: "Mahmoud Jaderi",
      alternateName: "CodeWithMJ",
    },
    inLanguage: "en-AU",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: "Mahmoud Jaderi",
      alternateName: "CodeWithMJ",
    },
  };

  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "CodeWithMJ - Mahmoud Jaderi Portfolio",
    alternateName: "Code With MJ Portfolio",
    description:
      "CodeWithMJ - A collection of full stack web development projects showcasing modern technologies by Mahmoud Jaderi",
    author: {
      "@type": "Person",
      name: "Mahmoud Jaderi",
      alternateName: "CodeWithMJ",
      jobTitle: "Full Stack Developer",
    },
    dateCreated: "2024",
    genre: "Web Development Portfolio",
    keywords:
      "CodeWithMJ, codewithmj,Code With MJ, Next.js, React, TypeScript, Full Stack Development, Web Applications, Mahmoud Jaderi",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioStructuredData),
        }}
      />
    </>
  );
}
