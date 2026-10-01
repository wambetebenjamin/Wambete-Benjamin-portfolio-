"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/lib/site";
import { ExternalLinkIcon, GitHubIcon } from "@/components/icons";

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured"
          highlight="projects"
          description="A selection of products I've designed, built and shipped — hover a card to peek inside."
        />

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.07 * (i % 3), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group glass relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-electric/40 hover:shadow-glow"
            >
              {/* Screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay with description */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/25 p-5 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
                  <p className="translate-y-4 text-sm leading-relaxed text-white transition-transform duration-500 group-hover:translate-y-0">
                    {project.description}
                  </p>
                </div>
                {/* category tag */}
                <span className="absolute left-4 top-4 rounded-full border border-electric/30 bg-white/90 px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-wider text-electric backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-lg font-bold text-ink-950 transition-colors group-hover:text-electric">
                  {project.title}
                </h3>

                {/* Tech badges */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink-950/10 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors group-hover:border-electric/30 group-hover:text-electric"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-5 flex gap-3 pt-1">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-electric to-gold px-4 font-heading text-xs font-bold text-white transition-all hover:shadow-glow-sm"
                  >
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code on GitHub`}
                    className="inline-flex min-h-[40px] w-[44px] items-center justify-center rounded-full border border-ink-950/15 bg-white/80 text-slate-600 transition-all hover:border-electric/50 hover:text-electric hover:shadow-glow-sm"
                  >
                    <GitHubIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/wambetebenjamin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <GitHubIcon className="h-4 w-4" />
            See more on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
