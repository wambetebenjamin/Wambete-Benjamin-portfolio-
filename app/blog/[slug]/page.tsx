import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollToTop from "@/components/ScrollToTop";
import { posts, site } from "@/lib/site";
import { ArrowRightIcon, CalendarIcon, ClockIcon } from "@/components/icons";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `${site.url}/blog/${post.slug}`,
      images: [{ url: post.image, width: 1200, height: 750, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function BlogPostPage({ params }: { params: Params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <article className="relative overflow-hidden py-16 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-96 bg-hero-glow"
          />
          <div className="section-shell relative max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-electric transition-colors hover:text-electric"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
              Back to all articles
            </Link>

            <span className="badge mt-6">{post.category}</span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink-950 sm:text-4xl">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-electric/40">
                  <Image
                    src="/images/hero-avatar.jpg"
                    alt="Wambete Benjamin"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
                <span className="font-medium text-slate-600">
                  {site.name}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4 text-electric" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4 text-electric" />
                {post.readTime}
              </span>
            </div>

            <div className="relative mt-9 aspect-[16/9] overflow-hidden rounded-3xl border border-ink-950/10 shadow-card">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>

            <div className="mt-10 flex flex-col gap-6">
              {post.body.map((paragraph, i) => (
                <p
                  key={i}
                  className={`leading-[1.85] text-slate-600 ${
                    i === 0 ? "text-lg text-slate-700" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Author box */}
            <div className="glass mt-14 flex flex-col items-start gap-5 rounded-3xl p-7 sm:flex-row sm:items-center">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-electric/50">
                <Image
                  src="/images/hero-avatar.jpg"
                  alt="Wambete Benjamin"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-heading text-sm font-bold uppercase tracking-wider text-electric">
                  Written by
                </p>
                <p className="mt-1 font-heading text-lg font-bold text-ink-950">
                  {site.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Full-stack web developer & UI/UX designer from Nairobi,
                  Kenya. Building the modern web, one article at a time.
                </p>
              </div>
              <Link href="/#contact" className="btn-primary sm:ml-auto">
                Work with me
              </Link>
            </div>

            {/* More articles */}
            {others.length > 0 && (
              <div className="mt-14">
                <h2 className="font-heading text-xl font-bold text-ink-950">
                  Keep reading
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {others.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group glass flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-electric/40"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 320px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-xs font-medium text-electric">
                          {p.category}
                        </span>
                        <h3 className="mt-2 font-heading text-base font-bold leading-snug text-ink-950 group-hover:text-electric">
                          {p.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppWidget />
      <ScrollToTop />
    </>
  );
}
