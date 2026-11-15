import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const target = process.env.CARPSYNC_APPLICATION_API_URL?.trim();
  if (!target || !/^https:\/\//i.test(target)) {
    return NextResponse.json(
      { message: "Applications are temporarily unavailable. Please email reece@karpstudio.co.uk." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "Expected an application form." }, { status: 415 });
  }
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return NextResponse.json({ message: "Application is too long." }, { status: 413 });
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("not_object");
  } catch {
    return NextResponse.json({ message: "Please check your application details." }, { status: 400 });
  }
  try {
    const response = await fetch(target, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) {
      return NextResponse.json(
        { message: response.status === 429 ? "Too many attempts. Please try again later." : "We couldn't receive your application. Please try again." },
        { status: response.status === 429 ? 429 : 502, headers: { "Cache-Control": "no-store" } },
      );
    }
    const data = await response.json() as { accepted?: unknown };
    if (data.accepted !== true) throw new Error("not_accepted");
    return NextResponse.json({ accepted: true }, { status: 202, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(
      { message: "The application service is unavailable. Please email reece@karpstudio.co.uk." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
