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
    name: "Mahmoud Jaderi - Full Stack Developer Portfolio",
    description:
      "Portfolio website showcasing full stack development projects and skills",
    url: env.NEXT_PUBLIC_BASE_URL,
    author: {
      "@type": "Person",
      name: "Mahmoud Jaderi",
    },
    inLanguage: "en-AU",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: "Mahmoud Jaderi",
    },
  };

  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Mahmoud Jaderi Portfolio",
    description:
      "A collection of full stack web development projects showcasing modern technologies",
    author: {
      "@type": "Person",
      name: "Mahmoud Jaderi",
      jobTitle: "Full Stack Developer",
    },
    dateCreated: "2024",
    genre: "Web Development Portfolio",
    keywords:
      "Next.js, React, TypeScript, Full Stack Development, Web Applications",
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
