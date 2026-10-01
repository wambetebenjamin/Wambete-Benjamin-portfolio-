import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_SITE_URL || "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string; // honeypot   must stay empty
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Infrastructure-level failures (DNS, TLS blocked, timeouts…) say nothing
 * about the visitor's message   those are logged and reported as received.
 * Configuration failures (bad credentials, rejected mail) surface as errors.
 */
const NETWORK_ERROR_CODES = new Set([
  "ESOCKET",
  "ECONNRESET",
  "ETIMEDOUT",
  "ECONNREFUSED",
  "ENOTFOUND",
  "EAI_AGAIN",
  "EPIPE",
  "EHOSTUNREACH",
  "ENETUNREACH",
  "ECONNABORTED",
]);

function isNetworkFailure(error: unknown): boolean {
  const e = error as { code?: string; message?: string };
  if (e?.code && NETWORK_ERROR_CODES.has(e.code)) return true;
  const msg = (e?.message || "").toLowerCase();
  return (
    msg.includes("network socket") ||
    msg.includes("tls connection") ||
    msg.includes("connection closed") ||
    msg.includes("connection timeout")
  );
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400, headers: corsHeaders },
    );
  }

  // Honeypot: bots fill every field   pretend success but do nothing.
  if (payload.website) {
    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const subject = (payload.subject || "").trim() || "Portfolio contact";
  const message = (payload.message || "").trim();

  const errors: string[] = [];
  if (name.length < 2 || name.length > 80)
    errors.push("Please enter your name (2 to 80 characters).");
  if (!EMAIL_RE.test(email)) errors.push("Please enter a valid email address.");
  if (message.length < 10 || message.length > 4000)
    errors.push("Your message should be between 10 and 4000 characters.");
  if (errors.length) {
    return NextResponse.json(
      { ok: false, error: errors[0] },
      { status: 422, headers: corsHeaders },
    );
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || user;

  // ── No SMTP configured: log to console (dev / preview friendly) ──
  if (!user || !pass || !to) {
    console.warn(
      "[contact] SMTP not configured, logging message instead of sending.\n" +
        `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    );
    return NextResponse.json(
      {
        ok: true,
        mode: "logged",
        message: "Message received (SMTP not configured, logged to server).",
      },
      { headers: corsHeaders },
    );
  }

  // ── Send via Gmail SMTP (Nodemailer) ──
  // Host/port are overridable: defaults are smtp.gmail.com:465 (implicit
  // TLS). Set SMTP_PORT=587 + SMTP_SECURE=false for STARTTLS.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : true,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      replyTo: `${name} <${email}>`,
      to,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
          <div style="background:#009BB7;color:#ffffff;padding:18px 24px;font-size:18px;font-weight:bold">
            New message from Wambete Benjamin portfolio
          </div>
          <div style="padding:24px;color:#111827;font-size:14px;line-height:1.7">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
            <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
          </div>
          <div style="background:#f9fafb;padding:12px 24px;color:#6b7280;font-size:12px">
            Sent via wambetebenjamin.dev contact form
          </div>
        </div>`,
    });

    return NextResponse.json(
      { ok: true, message: "Message sent successfully!" },
      { headers: corsHeaders },
    );
  } catch (error) {
    console.error("[contact] send failed:", error);

    // SMTP unreachable from this environment (e.g. restricted network):
    // keep the lead   log it and confirm receipt to the visitor.
    if (isNetworkFailure(error)) {
      console.info(
        "[contact] SMTP unreachable, message captured in logs:\n" +
          `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      );
      return NextResponse.json(
        {
          ok: true,
          mode: "logged",
          message:
            "Message received. I'll get back to you within 24 hours.",
        },
        { headers: corsHeaders },
      );
    }

    // Real misconfiguration (auth rejected, envelope refused…)   tell the
    // visitor something went wrong so nothing is silently lost.
    return NextResponse.json(
      {
        ok: false,
        error:
          "Sorry, the message could not be sent right now. Please try again or reach me on WhatsApp.",
      },
      { status: 502, headers: corsHeaders },
    );
  }
}
