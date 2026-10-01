/**
 * Simple JSON-file analytics store for WhatsApp button clicks.
 *
 * Vercel-compatible: serverless functions can only write to /tmp (ephemeral
 * per lambda instance). We persist to /tmp when possible and always keep an
 * in-memory copy as a fallback, so the endpoint never fails. For durable,
 * long-term analytics swap `readAll`/`append` for Upstash Redis, Vercel KV or
 * Turso — the API shape stays identical.
 */
import { promises as fs } from "fs";
import path from "path";

export type ClickEvent = {
  id: string;
  timestamp: string;
  referrer: string;
  userAgent: string;
  pathname: string;
};

const FILE = path.join("/tmp", "whatsapp-clicks.json");
const memory: ClickEvent[] = [];

async function readAll(): Promise<ClickEvent[]> {
  let fileEvents: ClickEvent[] = [];
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    const parsed = JSON.parse(raw) as ClickEvent[];
    if (Array.isArray(parsed)) fileEvents = parsed;
  } catch {
    /* file missing or unreadable — fall through */
  }
  // Merge file + memory, deduped by id (memory always holds the latest).
  const seen = new Set<string>();
  return [...fileEvents, ...memory].filter(
    (e) => !seen.has(e.id) && seen.add(e.id),
  );
}

async function append(event: ClickEvent): Promise<void> {
  memory.push(event);
  try {
    const current = await readAll();
    await fs.writeFile(FILE, JSON.stringify(current.slice(-1000)), "utf-8");
  } catch {
    /* read-only filesystem — in-memory copy above still holds the event */
  }
}

export async function logClick(input: {
  referrer?: string | null;
  userAgent?: string | null;
  pathname?: string | null;
}): Promise<ClickEvent> {
  const event: ClickEvent = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    referrer: input.referrer?.slice(0, 300) || "direct",
    userAgent: input.userAgent?.slice(0, 300) || "unknown",
    pathname: input.pathname?.slice(0, 200) || "/",
  };
  await append(event);
  return event;
}

export async function getStats(): Promise<{
  totalClicks: number;
  recentClicks: ClickEvent[];
}> {
  const events = await readAll();
  return {
    totalClicks: events.length,
    recentClicks: [...events].reverse().slice(0, 20),
  };
}
