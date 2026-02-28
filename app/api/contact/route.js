// app/api/contact/route.js
//
// HOW THIS WORKS (beginner friendly):
// ─────────────────────────────────────────────────────────────────────
// This file is your "middleware" — it sits between your frontend (the
// contact form) and your database (Neon/PostgreSQL).
//
// You never write SQL here. Instead you write plain JavaScript using
// Prisma, and Prisma automatically translates it into SQL behind the scenes.
//
//  Your JS code                    What Prisma sends to the database
//  ─────────────────────────────   ─────────────────────────────────────
//  prisma.message.findMany()   →   SELECT * FROM "Message" ORDER BY ...
//  prisma.message.create(...)  →   INSERT INTO "Message" (name, ...) VALUES (...)
//
// ─────────────────────────────────────────────────────────────────────

// NextResponse is the helper that formats the data we send back to the browser.
import { NextResponse } from "next/server";

// prisma is our database client — it knows how to talk to your Neon database.
import { prisma } from "@/lib/prisma";

// ─── GET /api/contact ────────────────────────────────────────────────
// This runs when someone (or your admin panel) requests all messages.
// Prisma turns this JS into:  SELECT * FROM "Message" ORDER BY "createdAt" DESC
export async function GET() {
  try {
    // findMany() = "get all rows from the Message table"
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" }, // newest messages first
    });

    // Send the messages back as JSON so the browser/admin panel can display them
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("GET /contact error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// ─── POST /api/contact ───────────────────────────────────────────────
// This runs when someone submits the contact form.
// Prisma turns this JS into:  INSERT INTO "Message" (name, email, message) VALUES (...)
export async function POST(req) {
  try {
    // req.json() reads the form data sent from the browser (name, email, message)
    const { name, email, message } = await req.json();

    // If no message was typed, reject the request early
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // create() = "insert a new row into the Message table"
    const msg = await prisma.message.create({
      data: {
        name: name ?? null,   // if name was left blank, store null
        email: email ?? null, // if email was left blank, store null
        message,              // the actual message text (required)
      },
    });

    // Send the saved message back so the frontend knows it was successful
    return NextResponse.json(msg, { status: 201 });
  } catch (error) {
    console.error("POST /contact error:", error);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
