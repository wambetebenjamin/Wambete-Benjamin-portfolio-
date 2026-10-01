# Wambete Benjamin Portfolio

A responsive personal portfolio for **Wambete Benjamin**, a full-stack web developer based in Nairobi, Kenya. Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**.

![OG banner](public/images/og-image.png)

## What changed

- Light theme inspired by the uploaded `nickie-master.zip` palette: teal `#009BB7`, deep blue `#076799`, amber `#FAAD3B`, clean white and soft light backgrounds.
- Branding uses the full **Wambete Benjamin** name throughout.
- Solid button fills only — no gradient-filled buttons.
- Personal photos are used for the hero, about, contact, and blog author areas.
- Generic testimonials/reviews have been removed from the homepage.
- Facebook social links were removed.

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `SMTP_USER` | Gmail address used to send contact-form emails |
| `SMTP_PASS` | Gmail App Password |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | Optional SMTP overrides |
| `CONTACT_TO` | Optional delivery inbox, defaults to `SMTP_USER` |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number in international format without `+` |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for SEO/OG/sitemap |

## Project Structure

```
app/                       # App Router pages, metadata, API routes
components/                # UI sections and shared components
lib/site.ts                # Site content, links, projects, posts
public/images/             # Personal photos, project shots, blog covers
public/cv/                 # CV download
```

## Personal photo assets

- `public/images/wambete-benjamin-square.jpg` — hero/avatar/blog author image
- `public/images/wambete-benjamin-portrait.jpg` — about portrait
- `public/images/wambete-benjamin-workspace.jpg` — contact/workspace image

## License

© 2026 Wambete Benjamin. All Rights Reserved.
