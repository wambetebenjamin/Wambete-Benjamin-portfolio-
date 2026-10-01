"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through phrases with a type → pause → delete rhythm.
 */
export default function Typewriter({
  phrases,
  className = "",
  typeSpeed = 75,
  deleteSpeed = 40,
  pause = 1700,
}: {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;
    const current = phrases[index % phrases.length];

    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1),
          );
        },
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, pause]);

  return (
    <span className={className} aria-live="polite">
      <span className="gradient-text">{text}</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] animate-blink bg-electric"
      />
    </span>
  );
}
