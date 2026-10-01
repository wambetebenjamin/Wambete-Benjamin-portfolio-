import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ToastProvider } from "@/components/Toast";
import { site, socials } from "@/lib/site";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/poppins-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Wambete Benjamin",
    "full-stack developer",
    "web developer Kenya",
    "Nairobi web developer",
    "React developer",
    "Next.js developer",
    "UI/UX designer Nairobi",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wambete Benjamin — Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/og-image.png"],
    creator: "@wambetebenjamin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#009BB7",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Full-Stack Web Developer",
  url: site.url,
  email: site.email,
  telephone: site.phoneHref,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [socials.github, socials.linkedin, socials.twitter, socials.instagram],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "UI/UX Design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <ToastProvider>
          {children}
          {/* Visitor won't see this — search engines will. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        </ToastProvider>
      </body>
    </html>
  );
}
