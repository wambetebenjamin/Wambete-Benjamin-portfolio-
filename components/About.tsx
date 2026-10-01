"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { stats, site } from "@/lib/site";
import {
  ArrowRightIcon,
  DownloadIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/icons";

/** Animated count-up that starts when scrolled into view. */
function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo for a satisfying finish
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const bioParagraphs = [
  "I'm Wambete Benjamin, a full-stack web developer from Nairobi with 5+ years of experience turning ideas into polished digital products. I care deeply about the details — clean architecture, fast load times and interfaces that feel effortless.",
  "My toolkit spans the whole stack: React and Next.js on the front, Node.js, Python and MongoDB on the back, with a healthy obsession for UI/UX design in between. From e-commerce platforms to AI-powered SaaS, I've shipped 50+ projects for clients across Kenya and beyond.",
  "When I'm not coding, you'll find me mentoring junior developers, writing about the web, or exploring Nairobi's coffee scene. Got a project in mind? Let's make it real.",
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="About Me"
          title="Get to"
          highlight="know me"
          description="A developer who designs, a designer who ships."
        />

        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* ── Image frame with glow ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="glow-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-electric/40">
              <Image
                src="/images/about-portrait.jpg"
                alt="Wambete Benjamin working on a laptop"
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="z-10 object-cover"
              />
              {/* caption bar */}
              <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-gradient-to-t from-ink-950/95 to-transparent p-5 pt-10">
                <p className="font-heading text-sm font-semibold text-white">
                  Wambete Benjamin
                </p>
                <p className="text-xs text-electric">
                  Full-Stack Developer · Nairobi
                </p>
              </div>
            </div>

            {/* corner accents */}
            <span
              aria-hidden="true"
              className="absolute -left-3 -top-3 h-14 w-14 rounded-tl-[2rem] border-l-4 border-t-4 border-electric"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 h-14 w-14 rounded-br-[2rem] border-b-4 border-r-4 border-electric"
            />
          </motion.div>

          {/* ── Bio ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Building the web, one pixel{" "}
              <span className="gradient-text">& one API</span> at a time
            </h3>

            {bioParagraphs.map((p, i) => (
              <p key={i} className="mt-5 leading-relaxed text-slate-400">
                {p}
              </p>
            ))}

            {/* Meta chips */}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-300">
                <MapPinIcon className="h-4 w-4 text-electric" />
                {site.location}
              </span>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-300">
                <MailIcon className="h-4 w-4 text-electric" />
                {site.email}
              </span>
            </div>

            {/* Counters */}
            <div className="mt-9 grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="glass rounded-2xl p-4 text-center sm:p-6"
                >
                  <p className="font-heading text-3xl font-extrabold text-electric sm:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">
                Let&apos;s Talk
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
