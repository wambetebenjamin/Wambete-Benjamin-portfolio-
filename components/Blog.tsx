"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { posts } from "@/lib/site";
import { ArrowRightIcon, ClockIcon } from "@/components/icons";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function Blog() {
  return (
    <section id="blog" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Blog"
          title="Latest"
          highlight="articles"
          description="Notes on web development, performance and design — written between builds."
        />

        <div className="grid gap-7 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group glass flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-electric/40 hover:shadow-glow"
            >
              {/* Cover */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full border border-electric/25 bg-white/90 px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-wider text-electric shadow-sm backdrop-blur-md">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5 text-electric" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-slate-950 transition-colors group-hover:text-electric">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-heading text-sm font-semibold text-electric transition-colors hover:text-brandBlue"
                >
                  Read More
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
