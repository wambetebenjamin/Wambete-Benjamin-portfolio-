"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { testimonials } from "@/lib/site";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@/components/icons";

const AUTOPLAY_MS = 5500;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
    },
    [],
  );

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => go(1), AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, go]);

  const t = testimonials[index];

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute right-0 top-24 h-80 w-80 rounded-full bg-electric/5 blur-3xl"
      />

      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients"
          highlight="say"
          description="Real feedback from real products — collaboration, communication and code that ships."
        />

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Card */}
          <div
            className="glass relative min-h-[340px] overflow-hidden rounded-3xl sm:min-h-[300px]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            {/* decorative quote */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 left-6 select-none font-heading text-[10rem] font-extrabold leading-none text-electric/10"
            >
              &ldquo;
            </span>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: 60 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 * direction }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-full flex-col items-center gap-6 px-7 py-10 text-center sm:px-12"
              >
                {/* Stars */}
                <div
                  className="flex gap-1"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-700 text-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  “{t.quote}”
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-electric/50 ring-offset-2 ring-offset-ink-900">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-heading text-sm font-bold text-white">
                      {t.name}
                    </p>
                    <p className="text-xs text-electric">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-7 flex items-center justify-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-electric/50 hover:text-electric hover:shadow-glow-sm"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-electric shadow-glow-sm"
                      : "w-2.5 bg-slate-600 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-electric/50 hover:text-electric hover:shadow-glow-sm"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
