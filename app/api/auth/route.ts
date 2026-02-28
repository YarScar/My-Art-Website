// app/api/auth/route.ts
//
// This is a SERVER-SIDE route. That means this code runs on the server,
// not in the browser. The ADMIN_PASSWORD env variable is never sent to
// or visible in the browser — the browser only ever gets back "ok: true"
// or "ok: false".
//
// When you click the 🦋 and type your password, the frontend sends it here.
// We compare it to what's stored in your .env file. If it matches → unlocked.

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    // process.env.ADMIN_PASSWORD reads from your .env file (server-side only)
    const correct = process.env.ADMIN_PASSWORD;

    if (!correct) {
      // If you forgot to set ADMIN_PASSWORD in .env, return an error
      return NextResponse.json({ error: "Admin password not configured" }, { status: 500 });
    }

    if (password === correct) {
      // Correct password — tell the frontend to unlock
      return NextResponse.json({ ok: true });
    } else {
      // Wrong password
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
