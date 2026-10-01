"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { useToast } from "@/components/Toast";
import { site, socials, HIRE_ME_URL } from "@/lib/site";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@/components/icons";

type Status = "idle" | "sending";

const inputClasses =
  "min-h-[48px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder-slate-400 outline-none shadow-sm transition-all duration-300 focus:border-electric/60 focus:bg-white focus:shadow-glow-sm";

export default function Contact() {
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });

  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        toast(
          data.mode === "logged"
            ? "Message received! I'll get back to you within 24 hours."
            : "Message sent successfully! I'll get back to you within 24 hours.",
          "success",
        );
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "",
        });
      } else {
        toast(
          data.error || "Something went wrong. Please try again.",
          "error",
        );
      }
    } catch {
      toast(
        "Network error. Please check your connection and try again.",
        "error",
      );
    } finally {
      setStatus("idle");
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-80 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-electric/10 blur-3xl"
      />

      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work"
          highlight="together"
          description="Have a project in mind, a role to fill, or just want to say hi? My inbox is always open."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* ── Contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            <div className="glass overflow-hidden rounded-3xl">
              <div className="relative isolate min-h-[430px] overflow-hidden bg-electric/5 p-5">
                <div className="absolute right-5 top-6 hidden h-56 w-36 rotate-6 overflow-hidden rounded-[1.5rem] border border-white bg-white shadow-card sm:block">
                  <Image
                    src="/images/wambete-benjamin-city.jpg"
                    alt="Wambete Benjamin city portrait"
                    fill
                    sizes="144px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="relative z-10 mx-auto h-[390px] w-[220px] overflow-hidden rounded-[2rem] border border-white bg-white shadow-card">
                  <Image
                    src="/images/wambete-benjamin-rooftop.jpg"
                    alt="Wambete Benjamin rooftop portrait"
                    fill
                    sizes="220px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="glass absolute bottom-5 left-5 z-20 max-w-[220px] rounded-2xl px-4 py-3">
                  <p className="font-heading text-sm font-bold text-slate-950">
                    Nairobi based
                  </p>
                  <p className="text-xs text-slate-600">
                    Available for web projects and collaborations.
                  </p>
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-heading text-xl font-bold text-slate-950">
                  Contact information
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Based in Nairobi, working with clients worldwide. Average reply
                  time: under 24 hours.
                </p>

                <ul className="mt-7 flex flex-col gap-5">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="group flex items-center gap-4"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-electric/25 bg-electric/10 text-electric transition-all group-hover:shadow-glow-sm">
                        <MailIcon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-slate-500">
                          Email
                        </span>
                        <span className="text-sm font-medium text-slate-800 transition-colors group-hover:text-electric">
                          Email me
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${site.phoneHref}`}
                      className="group flex items-center gap-4"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-electric/25 bg-electric/10 text-electric transition-all group-hover:shadow-glow-sm">
                        <PhoneIcon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-slate-500">
                          Phone / WhatsApp
                        </span>
                        <span className="text-sm font-medium text-slate-800 transition-colors group-hover:text-electric">
                          {site.phone}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-electric/25 bg-electric/10 text-electric">
                      <MapPinIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-slate-500">
                        Location
                      </span>
                      <span className="text-sm font-medium text-slate-800">
                        {site.location}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* WhatsApp direct card */}
            <a
              href={HIRE_ME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex items-center gap-4 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-whatsapp/50 hover:shadow-glow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white transition-transform group-hover:scale-110">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-heading text-sm font-bold text-slate-950">
                  Prefer WhatsApp?
                </span>
                <span className="text-sm text-slate-600">
                  Chat with me instantly   usually replies in minutes.
                </span>
              </span>
            </a>

            {/* Socials */}
            <div className="flex items-center gap-3 px-1">
              <span className="font-heading text-xs uppercase tracking-wider text-slate-500">
                Follow
              </span>
              <span className="h-px flex-1 bg-slate-200" />
              {[
                { label: "GitHub", href: socials.github, Icon: GitHubIcon },
                { label: "LinkedIn", href: socials.linkedin, Icon: LinkedInIcon },
                { label: "Twitter", href: socials.twitter, Icon: TwitterIcon },
                {
                  label: "Instagram",
                  href: socials.instagram,
                  Icon: InstagramIcon,
                },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-electric/50 hover:text-electric"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.form
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-7 sm:p-9"
            noValidate={false}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Name <span className="text-electric">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={set("name")}
                  className={inputClasses}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Email <span className="text-electric">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={set("email")}
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="subject"
                className="mb-2 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                maxLength={120}
                placeholder="Project inquiry, job opportunity, collaboration…"
                value={form.subject}
                onChange={set("subject")}
                className={inputClasses}
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block font-heading text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Message <span className="text-electric">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={4000}
                rows={6}
                placeholder="Tell me about your project, goals, timeline, budget…"
                value={form.message}
                onChange={set("message")}
                className={`${inputClasses} min-h-[150px] resize-y`}
              />
            </div>

            {/* Honeypot   invisible to humans, catnip for bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={set("website")}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  />
                  Sending…
                </>
              ) : (
                <>
                  <SendIcon className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              Your details are only used to reply to your message. No spam,
              ever.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
