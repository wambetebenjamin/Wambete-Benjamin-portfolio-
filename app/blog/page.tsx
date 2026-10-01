import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollToTop from "@/components/ScrollToTop";
import { posts } from "@/lib/site";
import { ArrowRightIcon, ClockIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on web development, performance and UI/UX design by Wambete Benjamin.",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function BlogIndexPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="relative overflow-hidden py-20 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-hero-glow bg-grid-fade bg-[size:56px_56px] opacity-80 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]"
          />
          <div className="section-shell relative">
            <span className="badge">Blog</span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Thoughts on the <span className="gradient-text">modern web</span>
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
              Essays and practical guides from five years of building for the
              web   performance, design systems and everything in between.
            </p>

            <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group glass flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-electric/40 hover:shadow-glow"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-electric/25 bg-white/90 px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-wider text-electric shadow-sm backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-3.5 w-3.5 text-electric" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="mt-3 font-heading text-lg font-bold leading-snug text-slate-950 transition-colors group-hover:text-electric">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-heading text-sm font-semibold text-electric hover:text-brandBlue"
                    >
                      Read More
                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </>
  );
}
