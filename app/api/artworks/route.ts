// app/api/artworks/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const artworks = await prisma.artwork.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(artworks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch artworks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, long, price, medium, dimensions, year, sold, tags, image } = body;

    if (!title || !description || price === undefined) {
      return NextResponse.json(
        { error: "title, description, and price are required" },
        { status: 400 }
      );
    }

    const artwork = await prisma.artwork.create({
      data: {
        title,
        description,
        long: long ?? null,
        price: parseFloat(String(price)),
        medium: medium ?? null,
        dimensions: dimensions ?? null,
        year: year ? parseInt(String(year)) : null,
        sold: sold ?? false,
        tags: Array.isArray(tags) ? tags : [],
        image: image ?? null,
      },
    });

    return NextResponse.json(artwork, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create artwork" },
      { status: 500 }
    );
  }
}
