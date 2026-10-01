"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_WIDGET_URL } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons";

/**
 * Floating WhatsApp chat button (bottom-right):
 * green circle + pulsing ring, expands to "Chat with me 💬" on hover,
 * logs the click to /api/track-whatsapp before opening the chat.
 */
export default function WhatsAppWidget() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleClick = () => {
    try {
      const payload = JSON.stringify({
        referrer: document.referrer || "direct",
        pathname: window.location.pathname,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/track-whatsapp",
          new Blob([payload], { type: "application/json" }),
        );
      } else {
        fetch("/api/track-whatsapp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      /* analytics must never block the chat */
    }
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* pulsing rings */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp/60"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp/40 [animation-delay:1.1s]"
      />

      <a
        href={WHATSAPP_WIDGET_URL}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Wambete on WhatsApp"
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_35px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-105 hover:bg-whatsappDark hover:shadow-[0_10px_45px_rgba(37,211,102,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
      >
        <WhatsAppIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />

        {/* Expanding label (desktop) */}
        <span className="pointer-events-none absolute right-full top-1/2 mr-4 hidden -translate-y-1/2 translate-x-3 whitespace-nowrap rounded-full border border-slate-200 bg-white px-5 py-2.5 font-heading text-sm font-semibold text-slate-950 opacity-0 shadow-card backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          Chat with me 💬
        </span>
      </a>
    </motion.div>
  );
}
