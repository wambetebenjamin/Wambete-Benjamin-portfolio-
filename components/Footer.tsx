import { navLinks, site, socials } from "@/lib/site";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  TwitterIcon,
} from "@/components/icons";

const socialLinks = [
  { label: "GitHub", href: socials.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: socials.linkedin, Icon: LinkedInIcon },
  { label: "Twitter", href: socials.twitter, Icon: TwitterIcon },
  { label: "Instagram", href: socials.instagram, Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-950/10 bg-white/85">
      <div className="section-shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="flex items-center gap-2 font-heading text-xl font-bold"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-electric/40 bg-electric/10 text-sm font-extrabold text-electric">
                WB
              </span>
              <span className="text-ink-950">
                Wambete <span className="text-electric">Benjamin</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              Full-stack web developer & UI/UX designer from Nairobi, Kenya —
              building products that are fast, accessible and beautiful.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
              <MailIcon className="h-4 w-4 text-electric" />
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-electric"
              >
                {site.email}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-ink-950">
              Quick Links
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[36px] items-center text-sm text-slate-600 transition-colors hover:text-electric"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-ink-950">
              Connect
            </h3>
            <p className="mt-4 text-sm text-slate-600">
              Let&apos;s be friends across the internet.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} profile`}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-950/10 bg-white/80 text-slate-600 transition-all hover:-translate-y-1 hover:border-electric/50 hover:text-electric hover:shadow-glow-sm"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-950/10 bg-white/80 text-slate-600 transition-all hover:-translate-y-1 hover:border-electric/50 hover:text-electric hover:shadow-glow-sm"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-950/10 pt-7 sm:flex-row">
          <p className="text-center text-sm text-slate-500">
            © 2026 Wambete Benjamin. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-slate-600">
            Built with
            <span aria-hidden="true" className="text-electric">
              ♥
            </span>
            using Next.js & Tailwind CSS · Nairobi, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
