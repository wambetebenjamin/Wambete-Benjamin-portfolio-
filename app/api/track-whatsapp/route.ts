import { NextRequest, NextResponse } from "next/server";
import { logClick, getStats } from "@/lib/analytics-store";

export const dynamic = "force-dynamic";

/** CORS   allow the deployed site (and local dev) to call this endpoint. */
const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_SITE_URL || "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

/** POST   log a WhatsApp button click with timestamp + referrer. */
export async function POST(request: NextRequest) {
  try {
    let referrer = request.headers.get("referer");
    let userAgent = request.headers.get("user-agent");
    let pathname = "/";

    // Prefer client-sent beacon data when available.
    try {
      const body = await request.json();
      if (typeof body?.referrer === "string") referrer = body.referrer;
      if (typeof body?.pathname === "string") pathname = body.pathname;
    } catch {
      /* no JSON body   headers only */
    }

    const event = await logClick({ referrer, userAgent, pathname });
    return NextResponse.json(
      { ok: true, id: event.id, timestamp: event.timestamp },
      { status: 201, headers: corsHeaders },
    );
  } catch (error) {
    console.error("[track-whatsapp] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to log click" },
      { status: 500, headers: corsHeaders },
    );
  }
}

/** GET   simple analytics summary (total clicks + last 20 events). */
export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json({ ok: true, ...stats }, { headers: corsHeaders });
  } catch (error) {
    console.error("[track-whatsapp] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to read analytics" },
      { status: 500, headers: corsHeaders },
    );
  }
}
