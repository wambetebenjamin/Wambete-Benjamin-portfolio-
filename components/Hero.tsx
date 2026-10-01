"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Particles from "@/components/Particles";
import Typewriter from "@/components/Typewriter";
import { heroRoles, site, socials, WHATSAPP_WIDGET_URL } from "@/lib/site";
import {
  ArrowRightIcon,
  DownloadIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@/components/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const socialLinks = [
  { label: "GitHub", href: socials.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: socials.linkedin, Icon: LinkedInIcon },
  { label: "Twitter", href: socials.twitter, Icon: TwitterIcon },
  { label: "Instagram", href: socials.instagram, Icon: InstagramIcon },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-dvh items-center overflow-hidden pt-[72px]"
    >
      {/* Subtle network background */}
      <Particles />

      {/* Ambient colour + grid from the uploaded zip palette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-hero-glow bg-grid-fade bg-[size:56px_56px] opacity-80 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />

      <div className="section-shell relative z-10 grid items-center gap-14 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* ── Copy ── */}
        <div className="text-center lg:text-left">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.05}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-electric/25 bg-white/85 px-4 py-1.5 font-heading text-xs font-semibold text-electric shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
            </span>
            Available for freelance & full-time roles
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="font-heading text-lg font-medium text-slate-700"
          >
            👋 Hi, I&apos;m <span className="text-slate-950">Wambete Benjamin</span>
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.25}
            className="mt-3 font-heading text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl xl:text-6xl"
          >
            I&apos;m a
            <br className="sm:hidden" />{" "}
            <Typewriter
              phrases={[...heroRoles]}
              className="inline-block min-h-[1.25em]"
            />
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.35}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0"
          >
            Based in <span className="font-semibold text-electric">Nairobi, Kenya</span> 🇰🇪, I
            design and build fast, beautiful web applications — from pixel-perfect
            interfaces to robust APIs and databases.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a href="#projects" className="btn-primary">
              View My Work
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href={site.cv}
              download="Wambete-Benjamin-CV.pdf"
              className="btn-outline"
            >
              <DownloadIcon className="h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.55}
            className="mt-9 flex items-center justify-center gap-3 lg:justify-start"
          >
            <span className="hidden h-px w-10 bg-electric/40 sm:block" />
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} profile`}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-electric/50 hover:text-electric hover:shadow-glow-sm"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Avatar ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-64 sm:w-72 lg:w-full lg:max-w-sm"
        >
          {/* orbit ring */}
          <div
            aria-hidden="true"
            className="absolute -inset-8 animate-spin-slow rounded-full border border-dashed border-electric/30 sm:-inset-10"
          >
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brandAmber shadow-glow-sm" />
          </div>

          <div className="glow-frame relative aspect-square overflow-hidden rounded-[2.5rem] border border-electric/30 bg-white">
            <Image
              src="/images/wambete-benjamin-square.jpg"
              alt="Wambete Benjamin — Full-Stack Web Developer"
              fill
              priority
              sizes="(max-width: 1024px) 288px, 384px"
              className="z-10 object-cover"
            />
          </div>

          {/* Floating chips */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-6 top-10 z-20 hidden rounded-2xl px-4 py-3 sm:block"
          >
            <p className="font-heading text-lg font-bold text-electric">5+</p>
            <p className="text-xs text-slate-600">Years Experience</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="glass absolute -right-4 bottom-12 z-20 hidden rounded-2xl px-4 py-3 sm:block"
          >
            <p className="font-heading text-lg font-bold text-electric">50+</p>
            <p className="text-xs text-slate-600">Projects Delivered</p>
          </motion.div>

          {/* Quick WhatsApp chip */}
          <a
            href={WHATSAPP_WIDGET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass absolute -bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 font-heading text-sm font-medium text-slate-950 transition-colors hover:text-electric"
          >
            <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
            Let&apos;s build together
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition-colors hover:text-electric md:flex"
      >
        <span className="font-heading text-[11px] uppercase tracking-[0.25em]">
          Scroll
        </span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-current p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-current"
          />
        </span>
      </motion.a>
    </section>
  );
}
