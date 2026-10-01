# Wambete Benjamin Portfolio

A responsive personal portfolio for **Wambete Benjamin**, a full-stack web developer based in Nairobi, Kenya. Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**, and deploy-ready on **Vercel**.

![OG banner](public/images/og-image.png)

## ✨ Features

| Area | Details |
| --- | --- |
| 🎨 Design | Light theme inspired by the bundled Nickie template colors: teal `#009BB7`, gold `#FAAD3B`, white, soft paper gray, and dark text. |
| 🦸 Hero | Full-screen intro, typewriter cycling *Full Stack Developer / UI/UX Designer / Problem Solver*, and Wambete Benjamin imagery from the repository. |
| 📊 About | Personal bio, image frame, and animated count-ups. |
| 🛠 Skills | Scroll-triggered skill bars and a tools marquee. |
| 🚀 Projects | Work showcase cards with screenshots, tech badges, hover descriptions, Live Demo / GitHub buttons. |
| 📝 Blog | Post cards with category tags and read time, plus full article pages at `/blog/[slug]`. |
| 📧 Contact | Working form (Name / Email / Subject / Message) → `/api/contact` with success/error toasts. |
| 💚 WhatsApp | Floating WhatsApp widget, click-tracking via `/api/track-whatsapp`, plus “Hire Me” CTAs. |
| 📱 Mobile | Hamburger slide-in drawer, ≥48px touch targets, mobile-first breakpoints. |
| 🔍 SEO | Meta + Open Graph + Twitter Card, JSON-LD Person schema, `sitemap.xml`, `robots.txt`, PWA manifest. |

## 🧱 Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** + custom CSS utilities
- **Framer Motion** (scroll reveals and drawer animations)
- **Custom canvas particles**
- **Nodemailer** for the contact form

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev                  # http://localhost:3000
```

### Environment variables (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `SMTP_USER` | Gmail address used to **send** contact-form emails |
| `SMTP_PASS` | Gmail **App Password** |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | Optional SMTP overrides |
| `CONTACT_TO` | Optional delivery inbox (defaults to `SMTP_USER`) |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number in international format without `+` |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for SEO/OG/sitemap |

Without SMTP credentials, the contact API works in log mode for testing.

## 🗂 Project Structure

```
app/
├── layout.tsx            # fonts, SEO metadata, JSON-LD
├── page.tsx              # one-page portfolio
├── globals.css           # Tailwind + light theme utilities
├── sitemap.ts / robots.ts / manifest.ts
├── icon.svg              # favicon
├── not-found.tsx         # custom 404
├── blog/                 # blog index + [slug] article pages
└── api/                  # contact + WhatsApp tracking routes
components/               # Navbar, Hero, About, Skills, Projects, Blog,
                          # Contact, Footer, WhatsAppWidget, Toast, etc.
lib/
├── site.ts               # site copy, links, projects, posts
└── analytics-store.ts    # Vercel-compatible JSON click store
public/
├── images/               # Wambete photos, work showcase images, blog covers
└── cv/Wambete-Benjamin-CV.pdf
```

## 🖼 Images

The public-facing people images now use Wambete Benjamin photos from the repository. Generic testimonial/review content and unused AI-generated people images were removed. Project images remain as work-showcase assets.

## 📄 License

© 2026 Wambete Benjamin. All Rights Reserved.
