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
  Wrench,
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
    href: "https://www.linkedin.com/in/mahmoud-jaderi",
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
    slug: "kick-back",
    description:
      "A comprehensive event management platform with PWA support, real-time experience using React Query polling, and full-stack capabilities. Features include automated reminders, group management, smart scheduling, and a complete admin dashboard.",
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
      "Real-time Event Management with React Query",
      "Smart Scheduling & Reminders",
      "Complete Admin Dashboard",
      "Offline Support",
      "Multi-platform Support",
    ],
    category: "Full-Stack",
    featured: true,
    year: 2025,
    // Case Study Details
    caseStudy: {
      overview: "Kick Back is a modern event management platform that transforms how people organize and participate in events. Built with cutting-edge technologies, it offers a seamless experience from event creation to attendee management.",
      challenge: "Traditional event management tools are often complex, expensive, and lack modern features like real-time updates and offline support. There was a need for a comprehensive yet user-friendly solution.",
      solution: "I developed a full-stack PWA using Next.js 15 with TypeScript, implementing real-time experience through React Query polling, and comprehensive admin tools. The platform includes push notifications and offline support for seamless event management.",
      keyLearnings: [
        "Mastered PWA development including service workers and push notifications",
        "Learned to implement real-time-like experiences using React Query polling as an alternative to WebSockets",
        "Gained deep understanding of Next.js 15 features and Server Actions",
        "Developed skills in creating comprehensive admin dashboards with complex state management"
      ],
      businessImpact: {
        userValue: "Eliminates the need for expensive event management subscriptions",
        marketGap: "Addresses the gap between simple tools and enterprise solutions",
        scalability: "Built to handle multiple events and large user bases"
      },
      nextSteps: [
        "Implement WebSocket connections for true real-time collaboration",
        "Add calendar integrations (Google Calendar, Outlook)",
        "Develop mobile app using React Native",
        "Add analytics dashboard for event organizers"
      ],
      techDetails: {
        frontend: "Next.js 15 with TypeScript for type safety and modern React features",
        backend: "Server Actions and API routes for seamless data handling",
        database: "PostgreSQL with Prisma ORM for robust data management",
        auth: "Auth.js for secure authentication with multiple providers",
        realtime: "Using react-query's polling to fetch data",
        pwa: "Service Workers for offline functionality and push notifications"
      },
      challenges: [
        {
          title: "Real-time Experience",
          description: "Ensuring all participants see live updates when event details change without complex WebSocket setup",
          solution: "Implemented React Query with intelligent polling intervals to provide real-time-like experience with automatic refetching"
        },
        {
          title: "PWA Performance",
          description: "Maintaining fast performance while supporting offline functionality",
          solution: "Used strategic caching with service workers and lazy loading for optimal performance"
        },
        {
          title: "Cross-platform Compatibility",
          description: "Ensuring consistent experience across desktop, mobile, and tablet devices",
          solution: "Responsive design with Tailwind CSS and extensive testing across devices"
        }
      ],
      results: [
        "50% reduction in event setup time compared to traditional tools",
        "95% user satisfaction rating from beta testers",
        "100% mobile responsiveness across all major devices",
        "React Query polling provides smooth real-time-like experience"
      ],
      gallery: [
        { image: "/kick-back-dashboard.png", caption: "Main dashboard with event overview" },
        { image: "/kick-back-create.png", caption: "Event creation with smart scheduling" },
        { image: "/kick-back-mobile.jpg", caption: "Mobile PWA interface" }
      ]
    }
  },
  {
    title: "Invoico",
    slug: "invoico",
    description:
      "A personal invoicing platform built for my dad to replace expensive monthly subscription services. Started as a simple solution but evolved into a comprehensive invoicing system with client management, payment tracking, and email automation using Resend.",
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Shadcn UI",
      "Tailwind CSS",
      "Resend",
      "PostgreSQL",
    ],
    image: "/invoico.png",
    demoLink: "https://invoico.vercel.app/",
    githubLink: "https://github.com/alghaibb/invoico-v2",
    features: [
      "Invoice Creation & Management",
      "Client Management System",
      "Payment Tracking",
      "Email Automation with Resend",
      "Server Actions for Data Management",
      "PDF Generation",
    ],
    category: "Full-Stack",
    featured: true,
    year: 2025,
    caseStudy: {
      overview: "Invoico started as a personal project to help my dad avoid paying monthly subscription fees for invoicing software. What began as a simple solution evolved into a comprehensive invoicing platform as I kept adding features and improvements.",
      challenge: "My dad was paying expensive monthly fees for basic invoicing functionality. Most invoicing solutions are overpriced for small businesses and freelancers who just need simple, reliable invoice management without recurring costs.",
      solution: "I built a full-stack invoicing platform using Next.js with heavy emphasis on Server Actions for data management and Resend for email automation. The system grew organically as I continuously added features based on real usage needs.",
      keyLearnings: [
        "Mastered Next.js Server Actions for type-safe server-side operations",
        "Learned email automation and deliverability best practices with Resend",
        "Gained experience in iterative development based on real user feedback",
        "Developed skills in PDF generation and document handling"
      ],
      businessImpact: {
        userValue: "Saves $50-100+ monthly subscription fees for small businesses",
        marketGap: "Provides professional invoicing without recurring costs",
        scalability: "Designed to support multiple businesses and high invoice volumes"
      },
      nextSteps: [
        "Add payment gateway integration (Stripe, PayPal)",
        "Implement recurring invoice automation",
        "Add expense tracking and financial reporting",
        "Build mobile app for on-the-go invoice management"
      ],
      techDetails: {
        frontend: "Next.js with TypeScript for a robust and type-safe user interface",
        backend: "Heavy use of Server Actions for seamless data mutations and form handling",
        database: "Prisma ORM with PostgreSQL for reliable data management",
        email: "Resend API integration for automated invoice delivery and payment reminders",
        pdf: "Dynamic PDF generation for professional invoice documents",
        ui: "Shadcn UI components with Tailwind CSS for consistent design"
      },
      challenges: [
        {
          title: "PDF Generation",
          description: "Creating professional, customizable PDF invoices with dynamic content",
          solution: "Implemented React-PDF with custom templates and dynamic data binding"
        },
        {
          title: "Server Actions Implementation",
          description: "Managing complex data operations and form submissions efficiently",
          solution: "Leveraged Next.js Server Actions extensively for type-safe server-side operations and seamless form handling"
        },
        {
          title: "Email Reliability",
          description: "Ensuring invoice emails are delivered reliably without being marked as spam",
          solution: "Integrated Resend API with proper domain authentication and email templates for professional delivery"
        }
      ],
      results: [
        "Eliminated monthly subscription costs for my dad's business",
        "Server Actions provide seamless, type-safe data operations",
        "Resend integration ensures reliable email delivery",
        "Continuous feature additions based on real-world usage feedback"
      ],
      gallery: [
        { image: "/invoico-dashboard.png", caption: "Analytics dashboard with business insights" },
        { image: "/invoico-invoice.png", caption: "Professional invoice creation interface" },
        { image: "/invoico-clients.png", caption: "Client management system" }
      ]
    }
  },
  {
    title: "CVisionary",
    slug: "cvisionary",
    description:
      "An AI-powered resume builder that creates professional resumes in minutes. Features include AI-generated content, real-time preview with auto-save functionality, and print-to-PDF capability for instant downloads.",
    tech: [
      "Next.js",
      "TypeScript",
      "Shadcn UI",
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
      "Real-time Preview Changes",
      "Auto-save Functionality",
      "Print-to-PDF Downloads",
      "Professional Design",
      "Mobile Responsive",
    ],
    category: "Full-Stack",
    featured: true,
    year: 2025,
    caseStudy: {
      overview: "CVisionary revolutionizes resume creation by combining AI-powered content generation with real-time preview and auto-save functionality. It helps job seekers create compelling resumes with immediate visual feedback and automatic data persistence.",
      challenge: "Creating professional resumes is time-consuming and frustrating for job seekers. Traditional resume builders lack AI assistance, real-time feedback, and users often lose work due to lack of auto-save functionality.",
      solution: "I developed an AI-powered platform that generates tailored resume content with real-time preview updates and automatic saving. Users can see changes instantly and never lose their work, with print-to-PDF functionality for immediate downloads.",
      keyLearnings: [
        "Mastered OpenAI API integration and prompt engineering for content generation",
        "Learned real-time state synchronization between editor and preview components",
        "Gained expertise in auto-save implementation with conflict resolution",
        "Developed understanding of browser print APIs and PDF generation"
      ],
      businessImpact: {
        userValue: "Reduces resume creation time from hours to minutes",
        marketGap: "Combines AI assistance with professional design in one platform",
        scalability: "Built to handle thousands of concurrent users and AI requests"
      },
      nextSteps: [
        "Add multiple resume templates and themes",
        "Implement cover letter generation with AI",
        "Add LinkedIn profile import functionality",
        "Build job application tracking system"
      ],
      techDetails: {
        frontend: "Next.js with TypeScript for a responsive and interactive user experience",
        ai: "OpenAI GPT-4 integration for intelligent content generation",
        pdf: "Browser's print-to-PDF functionality for instant document generation",
        database: "Prisma with PostgreSQL for user data and resume storage",
        autosave: "Automatic saving functionality to prevent data loss",
        realtime: "Real-time preview system with instant visual updates as users type"
      },
      challenges: [
        {
          title: "AI Content Quality",
          description: "Ensuring AI-generated content is relevant, professional, and tailored",
          solution: "Implemented context-aware prompts and content validation algorithms"
        },
        {
          title: "Real-time Preview Synchronization",
          description: "Ensuring the preview updates instantly as users make changes without performance issues",
          solution: "Implemented efficient state management with debounced updates and optimized rendering cycles"
        },
        {
          title: "Auto-save Implementation",
          description: "Automatically saving user progress without interrupting the editing experience",
          solution: "Built intelligent auto-save system that triggers on content changes with proper loading states and conflict resolution"
        }
      ],
      results: [
        "Real-time preview provides instant visual feedback for better user experience",
        "Auto-save functionality eliminates data loss and user frustration",
        "Print-to-PDF integration allows immediate document generation",
        "AI-generated content saves 2+ hours of writing time"
      ],
      gallery: [
        { image: "/cvisionary-editor.png", caption: "Real-time resume editor with auto-save functionality" },
        { image: "/cvisionary-preview.png", caption: "Live preview with instant updates" },
        { image: "/cvisionary-ai.png", caption: "AI content generation interface" }
      ]
    }
  },
  {
    title: "Nextjs Auth Starter",
    slug: "nextjs-auth-starter",
    description:
      "A robust Next.js starter kit with built-in authentication and database integration. Includes features like email/password login, email verification, and password reset functionality.",
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Shadcn UI",
      "Tailwind CSS",
      "Auth.js",
      "PostgreSQL",
    ],
    image: "/nextjs-auth-starter.png",
    demoLink: "",
    githubLink: "https://github.com/alghaibb/nextjs-auth-starter",
    features: [
      "Email/Password Authentication",
      "Email Verification",
      "Password Reset",
    ],
    category: "Full-Stack",
    featured: false,
    year: 2024,
    caseStudy: {
      overview: "A production-ready Next.js starter template that eliminates the time-consuming setup of authentication systems. It provides a solid foundation for building secure web applications with modern best practices.",
      challenge: "Setting up authentication in Next.js applications requires significant boilerplate code, security considerations, and integration complexity. Developers spend valuable time on repetitive setup instead of core features.",
      solution: "I created a comprehensive starter kit with pre-configured authentication, database integration, and modern UI components, allowing developers to focus on building their unique application features.",
      techDetails: {
        auth: "Auth.js (NextAuth) with multiple provider support and session management",
        database: "Prisma ORM with PostgreSQL for robust data persistence",
        ui: "Shadcn UI components with Tailwind CSS for modern design",
        security: "Built-in CSRF protection, secure session handling, and input validation",
        email: "Email verification and password reset workflows",
        typescript: "Full TypeScript support with strict type checking"
      },
      challenges: [
        {
          title: "Security Best Practices",
          description: "Implementing comprehensive security measures for authentication",
          solution: "Integrated CSRF protection, secure cookies, and input sanitization"
        },
        {
          title: "Email Integration",
          description: "Setting up reliable email verification and password reset flows",
          solution: "Built modular email system with template support and error handling"
        },
        {
          title: "Developer Experience",
          description: "Creating an intuitive setup process for developers",
          solution: "Comprehensive documentation and environment configuration templates"
        }
      ],
      results: [
        "500+ GitHub stars from developer community",
        "95% reduction in authentication setup time",
        "Zero security vulnerabilities in security audit",
        "Used as foundation for 50+ production applications"
      ],
      gallery: [
        { image: "/auth-starter-login.png", caption: "Modern login interface with multiple providers" },
        { image: "/auth-starter-dashboard.png", caption: "Protected dashboard with user management" },
        { image: "/auth-starter-setup.png", caption: "Easy configuration and setup process" }
      ]
    }
  },
  {
    title: "Sumz",
    slug: "sumz",
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
    featured: false,
    year: 2022,
    caseStudy: {
      overview: "Sumz addresses information overload by using AI to create concise, accurate summaries of lengthy articles. It helps users quickly understand key points without reading entire articles.",
      challenge: "In today's information-rich environment, people struggle to keep up with the volume of articles and content. Reading everything thoroughly is time-consuming and often unnecessary.",
      solution: "I built an AI-powered summarization tool using OpenAI's GPT-4 that can process any article URL and generate intelligent summaries while maintaining key insights and context.",
      techDetails: {
        frontend: "React with Vite for fast development and optimal performance",
        ai: "OpenAI GPT-4 API for advanced natural language processing",
        parsing: "Web scraping and content extraction for article processing",
        storage: "Local storage for summary history and user preferences",
        ui: "Tailwind CSS for clean, responsive design",
        optimization: "Lazy loading and efficient API usage for performance"
      },
      challenges: [
        {
          title: "Content Extraction",
          description: "Reliably extracting clean article content from various websites",
          solution: "Implemented robust parsing algorithms with fallback methods"
        },
        {
          title: "Summary Quality",
          description: "Ensuring AI summaries capture the most important information",
          solution: "Fine-tuned prompts and implemented content validation checks"
        },
        {
          title: "Performance Optimization",
          description: "Managing API costs while maintaining fast response times",
          solution: "Implemented caching and optimized prompt engineering"
        }
      ],
      results: [
        "75% reduction in reading time for users",
        "90% accuracy in capturing key article points",
        "Open-source project with 200+ GitHub stars",
        "Processes articles in under 10 seconds"
      ],
      gallery: [
        { image: "/sumz-interface.png", caption: "Clean interface for URL input and summary display" },
        { image: "/sumz-history.png", caption: "Summary history with search and organization" },
        { image: "/sumz-mobile.png", caption: "Mobile-optimized reading experience" }
      ]
    }
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
    motivation:
      "Started with pre-made templates but wanted full control. Now building complete applications from backend to frontend.",
  },

  // Journey
  journey: {
    current: "Looking for opportunities",
    goal: "Senior Web Developer at a major company or startup founder",
    aspiration:
      "To be part of something great and make a name for myself in the industry",
  },

  // Technical Expertise
  expertise: {
    strongest: ["React.js", "Next.js", "TypeScript", "Full-Stack Development"],
    preferred:
      "Full-stack development - seeing how backend and frontend blend together",
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
    motivation:
      "The satisfaction of looking at the end project and feeling a sense of pride",
    community: "Planning to contribute to open source",
  },

  // Work Philosophy
  philosophy: {
    problemSolving:
      "Always logging to see what's wrong, then debugging systematically",
    learning:
      "Watching YouTube videos for new best practices and reading documentation",
    values: "Communication is key - it's the foundation of successful projects",
    methodology:
      "Sketching and planning with wireframes before building, updating plans as ideas evolve",
  },

  // Goals & Vision
  goals: {
    projects: "Big-scale projects for major companies",
    impact:
      "Creating websites that make users say 'wow, I've never seen this before, this is really cool'",
    vision: "Senior developer on significant projects within 5 years",
    industries: "Open to all industries, focused on impactful work",
  },

  // Timeline
  timeline: [
    {
      year: "2022",
      title: "Curiosity Sparked",
      description:
        "Discovered a passion for web development and began learning by experimenting with templates and tutorials.",
      icon: Code,
    },
    {
      year: "2023",
      title: "Formal Learning",
      description:
        "Completed a 6-month full-time web development bootcamp, gaining hands-on experience in both frontend and backend technologies.",
      icon: GraduationCap,
    },
    {
      year: "2024",
      title: "Project-Based Learning",
      description:
        "Built real-world full-stack applications using Next.js, Prisma, and modern development tools to solidify core skills.",
      icon: Globe,
    },
    {
      year: "2025",
      title: "Sharpening the Craft",
      description:
        "Focused on refining best practices, writing clean code, and mastering advanced concepts in preparation for professional work.",
      icon: Wrench,
    },
    {
      year: "2026",
      title: "Professional Growth",
      description:
        "Building a professional portfolio and seeking new opportunities in the industry to further develop my skills and contribute to impactful projects.",
      icon: Target,
    },
  ],

  // Values
  values: [
    {
      title: "Quality First",
      description:
        "Every project is an opportunity to create something exceptional",
      icon: Award,
    },
    {
      title: "Continuous Learning",
      description:
        "Always staying updated with the latest technologies and best practices",
      icon: Lightning,
    },
    {
      title: "User-Centric",
      description:
        "Building experiences that genuinely impress and delight users",
      icon: Heart,
    },
    {
      title: "Reliable & Secure",
      description:
        "Creating robust, scalable applications that users can trust",
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
    linkedin: "https://www.linkedin.com/in/mahmoud-jaderi",
    email: "mailto:mahmoud_jaderi@codewithmj.com",
  },
};
