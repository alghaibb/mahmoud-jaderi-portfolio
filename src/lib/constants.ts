import {
  Brain,
  Database,
  Globe,
  Lock,
  Smartphone,
  Zap,
  Github,
  Linkedin,
  Mail,
  Code,
  Target,
  Award,
  GraduationCap,
  Heart,
  Zap as Lightning,
  Shield,
} from "lucide-react";
import { env } from "./env";

// Social Links
export const socialLinks = [
  {
    href: "https://github.com/alghaibb",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/mahmoud-jaderi-150316290/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:mahmoud_jaderi@codewithmj.com",
    icon: Mail,
    label: "Email",
  },
];

// Navigation Links
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

// Skills Data
export const skills = [
  {
    name: "Full-Stack Development",
    icon: Globe,
    description:
      "Building complete web applications with Next.js, TypeScript, and modern frameworks. Full-stack expertise from database to UI.",
  },
  {
    name: "PWA & Mobile Apps",
    icon: Smartphone,
    description:
      "Creating Progressive Web Apps with offline capabilities, push notifications, and native-like mobile experiences.",
  },
  {
    name: "Real-time Features",
    icon: Zap,
    description:
      "Implementing real-time functionality with WebSockets, live updates, notifications, and collaborative features.",
  },
  {
    name: "AI Integration",
    icon: Brain,
    description:
      "Integrating AI services like OpenAI GPT-4 for intelligent features, content generation, and smart automation.",
  },
  {
    name: "Database & APIs",
    icon: Database,
    description:
      "Designing robust database architectures with PostgreSQL, Prisma ORM, and building scalable REST/GraphQL APIs.",
  },
  {
    name: "Security & Authentication",
    icon: Lock,
    description:
      "Implementing secure authentication systems, authorization, data protection, and following security best practices.",
  },
];

// Featured Projects
export const featuredProjects = [
  {
    title: "Kick Back",
    description:
      "A comprehensive event management platform with PWA support, real-time notifications, AI-powered features, and full-stack capabilities. Features include automated reminders, group management, smart scheduling, and a complete admin dashboard.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Auth.js",
      "PWA",
    ],
    image: "/kick-back.png",
    demoLink: "https://kick-back.vercel.app/",
    githubLink: "https://github.com/alghaibb/kick-back",
    features: [
      "PWA with Push Notifications",
      "Real-time Event Management",
      "Smart Scheduling & Reminders",
      "Complete Admin Dashboard",
      "AI-Powered Features",
      "Multi-platform Support",
    ],
    category: "Full-Stack",
    featured: true,
  },
  {
    title: "Invoico",
    description:
      "A modern, full-stack invoicing platform built with Next.js and TypeScript. Features include invoice creation, client management, payment tracking, email automation, and a comprehensive dashboard with real-time analytics.",
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Tailwind CSS",
      "Email API",
      "Database",
    ],
    image: "/invoico.png",
    demoLink: "https://invoico.vercel.app/",
    githubLink: "https://github.com/alghaibb/invoico-v2",
    features: [
      "Invoice Creation & Management",
      "Client Management System",
      "Payment Tracking",
      "Email Automation",
      "Real-time Analytics",
      "Professional Templates",
    ],
    category: "Full-Stack",
    featured: true,
  },
  {
    title: "CVisionary",
    description:
      "An AI-powered resume builder that creates professional resumes in minutes. Features include AI-generated content, live preview, customizable designs, instant PDF downloads, and multiple professional templates.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "AI Integration",
      "PDF Generation",
      "Prisma",
    ],
    image: "/cvisionary.png",
    demoLink: "https://cvisionary.vercel.app/",
    githubLink: "https://github.com/alghaibb/cvisionary",
    features: [
      "AI-Generated Content",
      "Live Preview Editor",
      "Customizable Templates",
      "Instant PDF Downloads",
      "Professional Designs",
      "Mobile Responsive",
    ],
    category: "AI/ML",
    featured: true,
  },
  {
    title: "Sumz",
    description:
      "An open-source article summarizer powered by OpenAI GPT-4 that condenses lengthy articles into clear, concise overviews. Features include URL input, history tracking, and intelligent content analysis.",
    tech: [
      "Vite",
      "JavaScript",
      "React",
      "OpenAI GPT-4",
      "Tailwind CSS",
      "API Integration",
    ],
    image: "/sumz.jpg",
    demoLink: "https://ai-summarizer-xi-lilac.vercel.app/",
    githubLink: "https://github.com/alghaibb/ai-summarizer",
    features: [
      "AI-Powered Summaries",
      "URL Input Processing",
      "History Tracking",
      "Open Source",
      "Clean UI/UX",
      "Fast Processing",
    ],
    category: "AI/ML",
    featured: true,
  },
];

// All Projects (including featured ones)
export const allProjects = [
  ...featuredProjects,
  // Add more projects here as needed
];

// Project Categories
export const projectCategories = [
  "All",
  "Full-Stack",
  "AI/ML",
  "Frontend",
  "Backend",
  "Mobile",
  "Tools",
];

// Footer Links
export const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

// Technologies for Footer
export const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
  "OpenAI",
  "Vercel",
];

// Contact Information
export const contactInfo = {
  email: "mahmoud_jaderi@codewithmj.com",
  location: "Remote / Worldwide",
  availability: "Available for new opportunities",
};

// About Page Data
export const aboutData = {
  // Personal Info
  name: "Mahmoud Jaderi",
  title: "Full Stack Developer",
  location: "Melbourne, Australia",
  tagline: "Building modern web applications that make users go 'wow'",

  // Background
  background: {
    location: "Melbourne, Australia",
    experience: "3+ years",
    education: "Web Development Certificate (6-month bootcamp) + Self-taught",
    motivation: "Started with pre-made templates but wanted full control. Now building complete applications from backend to frontend.",
  },

  // Journey
  journey: {
    current: "Looking for opportunities",
    goal: "Senior Web Developer at a major company or startup founder",
    aspiration: "To be part of something great and make a name for myself in the industry",
  },

  // Technical Expertise
  expertise: {
    strongest: ["React.js", "Next.js", "TypeScript", "Full-Stack Development"],
    preferred: "Full-stack development - seeing how backend and frontend blend together",
    stack: [
      "Next.js (combines backend and frontend seamlessly)",
      "Shadcn UI (highly customizable components)",
      "Tailwind CSS (rapid styling)",
      "Prisma ORM (type-safe database queries)",
      "PostgreSQL (usually with Neon)",
      "Auth.js (full authentication control)",
      "React Query (data fetching)",
    ],
    certification: "Web Development Certificate (6-month bootcamp)",
  },

  // Personal Interests
  interests: {
    hobbies: ["Boxing", "MMA events", "Weight lifting", "Training"],
    techRelated: "Staying updated with YouTube videos and documentation",
    motivation: "The satisfaction of looking at the end project and feeling a sense of pride",
    community: "Planning to contribute to open source",
  },

  // Work Philosophy
  philosophy: {
    problemSolving: "Always logging to see what's wrong, then debugging systematically",
    learning: "Watching YouTube videos for new best practices and reading documentation",
    values: "Communication is key - it's the foundation of successful projects",
    methodology: "Sketching and planning with wireframes before building, updating plans as ideas evolve",
  },

  // Goals & Vision
  goals: {
    projects: "Big-scale projects for major companies",
    impact: "Creating websites that make users say 'wow, I've never seen this before, this is really cool'",
    vision: "Senior developer on significant projects within 5 years",
    industries: "Open to all industries, focused on impactful work",
  },

  // Timeline
  timeline: [
    {
      year: "2021",
      title: "Started Coding Journey",
      description: "Began exploring web development, starting with pre-made templates",
      icon: Code,
    },
    {
      year: "2022",
      title: "Web Development Bootcamp",
      description: "Completed 6-month intensive web development program",
      icon: GraduationCap,
    },
    {
      year: "2023",
      title: "Full-Stack Projects",
      description: "Built comprehensive applications with Next.js and modern tech stack",
      icon: Globe,
    },
    {
      year: "2024",
      title: "Portfolio & Growth",
      description: "Focusing on professional development and seeking opportunities",
      icon: Target,
    },
    {
      year: "2025",
      title: "Professional Development",
      description: "Building a professional portfolio and seeking new opportunities in the industry",
      icon: Target,
    },
  ],

  // Values
  values: [
    {
      title: "Quality First",
      description: "Every project is an opportunity to create something exceptional",
      icon: Award,
    },
    {
      title: "Continuous Learning",
      description: "Always staying updated with the latest technologies and best practices",
      icon: Lightning,
    },
    {
      title: "User-Centric",
      description: "Building experiences that genuinely impress and delight users",
      icon: Heart,
    },
    {
      title: "Reliable & Secure",
      description: "Creating robust, scalable applications that users can trust",
      icon: Shield,
    },
  ],
};

// Site Configuration
export const siteConfig = {
  name: "Mahmoud Jaderi",
  title: "Full Stack Developer",
  description: "Modern web apps built with Next.js, TypeScript, and clean UI.",
  url: env.NEXT_PUBLIC_BASE_URL,
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/alghaibb",
    linkedin: "https://www.linkedin.com/in/mahmoud-jaderi-150316290/",
    email: "mailto:mahmoudjaderi@gmail.com",
  },
}; 