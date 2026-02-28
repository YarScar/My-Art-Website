// components/ArtworkCard.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import ArtworkModal from "./ArtworkModal";

type Artwork = {
  id: number;
  title: string;
  description: string;
  long?: string | null;
  image?: string | null;
  price: number;
  medium?: string | null;
  dimensions?: string | null;
  year?: number | null;
  sold: boolean;
  tags: string[];
  createdAt: Date;
};

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="artwork-card glass rounded-3xl overflow-hidden shadow-md w-full text-left group cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-60 overflow-hidden bg-gradient-to-br from-purple-100 to-violet-200">
          {artwork.image ? (
            <Image
              src={artwork.image}
              alt={artwork.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-40">
              🎨
            </div>
          )}

          {/* Sold badge */}
          {artwork.sold && (
            <div
              className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full text-white"
              style={{ background: "rgba(124,58,237,0.85)" }}
            >
              Sold
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/15 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              View Details
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3
            className="font-display text-xl font-semibold mb-1 leading-snug"
            style={{ color: "var(--plum-deep)" }}
          >
            {artwork.title}
          </h3>

          {artwork.medium && (
            <p
              className="font-cormorant italic text-base mb-2"
              style={{ color: "var(--plum-mid)" }}
            >
              {artwork.medium}
              {artwork.year ? `, ${artwork.year}` : ""}
            </p>
          )}

          {artwork.dimensions && (
            <p className="text-xs text-purple-400 mb-3">{artwork.dimensions}</p>
          )}

          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2"
            style={{ color: "#4a2970" }}
          >
            {artwork.description}
          </p>

          {/* Tags */}
          {artwork.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {artwork.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "var(--plum-pale)",
                    color: "var(--plum-rich)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span
              className="font-display text-2xl font-bold"
              style={{ color: "var(--gold-warm)" }}
            >
              ${artwork.price.toLocaleString()}
            </span>
            <span
              className="text-xs underline underline-offset-2"
              style={{ color: "var(--plum-mid)" }}
            >
              Enquire →
            </span>
          </div>
        </div>
      </button>

      {open && <ArtworkModal artwork={artwork} onClose={() => setOpen(false)} />}
    </>
  );
}
