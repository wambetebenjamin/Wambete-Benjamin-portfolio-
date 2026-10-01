"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { skills, otherTools } from "@/lib/site";

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-28">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-electric/5 blur-3xl"
      />

      <div className="section-shell relative">
        <SectionHeading
          eyebrow="My Skills"
          title="Technologies I"
          highlight="work with"
          description="The stack I use to take products from a blank file to a deployed, revenue-generating app."
        />

        <div className="mx-auto grid max-w-4xl gap-x-12 gap-y-8 sm:grid-cols-2">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.05 * (i % 4), duration: 0.5 }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 font-heading text-sm font-semibold text-slate-200">
                  <span aria-hidden="true">{skill.icon}</span>
                  {skill.name}
                </span>
                <span className="font-heading text-sm font-bold text-electric">
                  {skill.level}%
                </span>
              </div>

              <div
                className="h-3 overflow-hidden rounded-full border border-white/10 bg-ink-800"
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: 0.15 + 0.07 * (i % 4),
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="skill-fill h-full rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other tools marquee */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <p className="mb-5 text-center font-heading text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Also in my toolbox
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
              {[...otherTools, ...otherTools].map((tool, i) => (
                <span
                  key={`${tool}-${i}`}
                  className="glass whitespace-nowrap rounded-full px-5 py-2.5 font-heading text-sm font-medium text-slate-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
