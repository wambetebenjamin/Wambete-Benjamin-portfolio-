/**
 * Central site content & configuration for the portfolio.
 * Tweak copy, links, projects and posts here — the UI picks it up.
 */

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "254112272061";

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const HIRE_ME_URL =
  "https://wa.me/254112272061?text=Hello!%20I%20want%20to%20hire%20you";

export const WHATSAPP_WIDGET_URL = waLink("Hi Benjamin! I saw your portfolio");

export const site = {
  name: "Wambete Benjamin",
  shortName: "Wambete Benjamin",
  title: "Wambete Benjamin — Full-Stack Web Developer | Nairobi, Kenya",
  description:
    "Wambete Benjamin is a full-stack web developer & UI/UX designer based in Nairobi, Kenya. He builds fast, beautiful web apps with React, Next.js and Node.js. 5+ years experience, 50+ projects, 30+ happy clients.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://wambetebenjamin.vercel.app",
  email: "shambetz@gmail.com",
  phone: "+254 112 272 061",
  phoneHref: "+254112272061",
  location: "Nairobi, Kenya",
  cv: "/cv/Wambete-Benjamin-CV.pdf",
};

export const socials = {
  github: "https://github.com/wambetebenjamin",
  linkedin: "https://www.linkedin.com/in/wambetebenjamin",
  twitter: "https://twitter.com/wambetebenjamin",
  instagram: "https://www.instagram.com/wambetebenjamin",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroRoles = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Problem Solver",
];

export const stats = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 30, suffix: "+", label: "Happy Clients" },
];

export const skills = [
  { name: "HTML / CSS", level: 95, icon: "🎨" },
  { name: "JavaScript", level: 90, icon: "⚡" },
  { name: "React.js", level: 88, icon: "⚛️" },
  { name: "Node.js", level: 85, icon: "🟢" },
  { name: "Python", level: 80, icon: "🐍" },
  { name: "UI/UX Design", level: 75, icon: "✏️" },
  { name: "MongoDB", level: 82, icon: "🍃" },
  { name: "Tailwind CSS", level: 92, icon: "🌬️" },
];

export const otherTools = [
  "Next.js",
  "TypeScript",
  "Express",
  "PostgreSQL",
  "Prisma",
  "Firebase",
  "Figma",
  "Docker",
  "Git",
  "REST APIs",
  "Jest",
  "Framer Motion",
];

export type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  demo: string;
  github: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "ShopSavannah",
    category: "E-Commerce Platform",
    description:
      "A full-featured online storefront with a real-time admin dashboard, M-Pesa & Stripe payments, inventory sync and personalised recommendations — processing 12k+ orders a month.",
    image: "/images/project-1.jpg",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "M-Pesa"],
    demo: "https://shopsavannah.example.com",
    github: "https://github.com/wambetebenjamin/shopsavannah",
    featured: true,
  },
  {
    title: "PesaFlow",
    category: "Fintech Mobile Banking",
    description:
      "A secure mobile banking experience with instant balance, transaction history, bill payments and budgeting insights — built for a Kenyan micro-finance startup.",
    image: "/images/project-2.jpg",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    demo: "https://pesaflow.example.com",
    github: "https://github.com/wambetebenjamin/pesaflow",
  },
  {
    title: "NyumbaLink",
    category: "Real Estate Marketplace",
    description:
      "A property marketplace for Nairobi renters: map search, virtual tours, verified listings, saved searches and an agent dashboard with lead analytics.",
    image: "/images/project-3.jpg",
    tech: ["Next.js", "MongoDB", "Mapbox", "Tailwind CSS"],
    demo: "https://nyumbalink.example.com",
    github: "https://github.com/wambetebenjamin/nyumbalink",
    featured: true,
  },
  {
    title: "ChakulaExpress",
    category: "Food Delivery App",
    description:
      "On-demand food delivery with live rider tracking, smart routing, in-app payments and a restaurant partner portal for menus and analytics.",
    image: "/images/project-4.jpg",
    tech: ["React", "Express", "MongoDB", "Socket.io", "M-Pesa"],
    demo: "https://chakulaexpress.example.com",
    github: "https://github.com/wambetebenjamin/chakulaexpress",
  },
  {
    title: "ElimuHub",
    category: "E-Learning Platform",
    description:
      "An online learning platform with video courses, quizzes, progress tracking, certificates and instructor payouts — used by 4 schools across Kenya.",
    image: "/images/project-5.jpg",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Stripe"],
    demo: "https://elimuhub.example.com",
    github: "https://github.com/wambetebenjamin/elimuhub",
  },
  {
    title: "NexaChat",
    category: "AI Chat SaaS",
    description:
      "A GPT-powered assistant workspace with team conversations, usage metering, prompt templates and a slick streaming UI — 500+ sign-ups in the first month.",
    image: "/images/project-6.png",
    tech: ["Next.js", "OpenAI", "PostgreSQL", "Tailwind CSS"],
    demo: "https://nexachat.example.com",
    github: "https://github.com/wambetebenjamin/nexachat",
    featured: true,
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
};

export const testimonials: Testimonial[] = [];


export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  /** Paragraphs of the article body (rendered on /blog/[slug]). */
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "future-of-web-development-2026",
    title: "The Future of Web Development: Trends to Watch in 2026",
    excerpt:
      "From edge-first architectures to AI pair-programmers, here are the shifts reshaping how we build for the web — and what Kenyan developers should learn next.",
    category: "Web Development",
    readTime: "8 min read",
    date: "2026-09-12",
    image: "/images/wambete-benjamin-street.jpg",
    body: [
      "Every year the web platform gets a little more magical — and 2026 is no exception. The biggest shift isn't a single framework winning; it's the collapse of the distance between an idea and a deployed product. Edge runtimes, AI-assisted development and design-to-code tools are turning weeks of work into days.",
      "Edge-first is now the default architecture for new projects. Vercel, Cloudflare and Fastly all let you run full applications milliseconds away from your users, which means personalisation that used to require heavy client-side JavaScript now happens on the server without paying a latency tax.",
      "AI pair-programming has matured from autocomplete to genuine collaboration. The developers thriving aren't the ones avoiding these tools — they're the ones who learned to write precise specifications, review generated code rigorously, and let the machine handle the boilerplate while they focus on architecture and user experience.",
      "For developers in Nairobi and across Africa, this is a huge opportunity. The playing field for building world-class products has never been flatter. What matters now is distribution, taste and reliability — not access to infrastructure.",
      "My advice for 2026: master the fundamentals (HTTP, accessibility, performance budgets), get fluent with one edge-ready framework like Next.js, and treat AI tools as an amplifier for your judgment, not a replacement for it.",
    ],
  },
  {
    slug: "nextjs-lighthouse-100",
    title: "How I Got a Next.js Site to a Perfect 100 on Lighthouse",
    excerpt:
      "A practical checklist of the exact optimisations — image strategy, fonts, code-splitting and more — that took a client site from a 54 to a 100 performance score.",
    category: "Performance",
    readTime: "6 min read",
    date: "2026-08-03",
    image: "/images/wambete-benjamin-city.jpg",
    body: [
      "When a client came to me with a Next.js site scoring 54 on mobile Lighthouse, the fixes were less exotic than you'd expect. Performance work is mostly discipline: measure, fix the biggest cost, repeat.",
      "Images were the first villain — 3MB hero JPEGs served to every device. Moving to next/image with AVIF/WebP formats and proper sizes dropped the payload by 78% with zero visible quality loss.",
      "Fonts came next. Self-hosting with next/font, preloading only what's needed and using font-display: swap eliminated the invisible-text flash and shaved 400ms off first contentful paint.",
      "JavaScript diet: I replaced three animation libraries with CSS transforms and IntersectionObserver, deferred a chat widget until interaction, and code-split a heavy dashboard route. The main thread went from 4.1s of blocking time to under 300ms.",
      "The result: a stable 100/100 performance score on mobile, organic traffic up 34% in two months, and a client who now asks about Core Web Vitals before features. Performance is a feature — sell it that way.",
    ],
  },
  {
    slug: "design-systems-101",
    title: "Design Systems 101: Building UI That Scales",
    excerpt:
      "Colors, type scales, spacing tokens and components — a starter guide to building a design system that keeps your product consistent and your team fast.",
    category: "UI/UX Design",
    readTime: "5 min read",
    date: "2026-07-18",
    image: "/images/wambete-benjamin-garden.jpg",
    body: [
      "A design system is not a component library — it's a shared language. The library is just the dictionary. The real value is that designers and developers stop debating the same decisions and start shipping.",
      "Start with tokens: a small set of named decisions for color, spacing, typography and radii. Ten colors, a four-point spacing scale, three font sizes per breakpoint. If a token doesn't earn its place, cut it.",
      "Then build components in order of volatility: primitives (buttons, inputs) first, patterns (forms, cards) second, pages last. Document not just how a component looks, but when to use it — misuse is where systems die.",
      "Accessibility belongs in the foundation, not the polish phase. Color contrast ratios, focus states, touch targets of at least 48px and semantic HTML are cheap on day one and expensive on day one hundred.",
      "Finally, treat the system as a product with users — your team. Gather feedback, version it, and celebrate when someone ships a screen you've never seen but that still looks on-brand. That's the moment the system starts paying rent.",
    ],
  },
];
