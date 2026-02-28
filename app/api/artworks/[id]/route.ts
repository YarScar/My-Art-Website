// app/api/artworks/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    const artwork = await prisma.artwork.findUnique({ where: { id } });
    if (!artwork) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(artwork);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    const body = await req.json();
    const { title, description, long, price, medium, dimensions, year, sold, tags, image } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "title and description are required" },
        { status: 400 }
      );
    }

    const artwork = await prisma.artwork.update({
      where: { id },
      data: {
        title,
        description,
        long: long ?? null,
        price: price !== undefined ? parseFloat(String(price)) : undefined,
        medium: medium ?? null,
        dimensions: dimensions ?? null,
        year: year ? parseInt(String(year)) : null,
        sold: sold ?? false,
        tags: Array.isArray(tags) ? tags : [],
        image: image ?? null,
      },
    });

    return NextResponse.json(artwork);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    await prisma.artwork.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
