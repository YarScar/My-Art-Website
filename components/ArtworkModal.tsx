"use client";
// components/ArtworkModal.tsx
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

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

export default function ArtworkModal({
  artwork,
  onClose,
}: {
  artwork: Artwork;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(20,5,40,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full glass rounded-3xl overflow-hidden shadow-2xl"
        style={{
          boxShadow: "0 32px 80px rgba(74,16,112,0.4)",
          animation: "fadeUp 0.35s ease forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white text-lg transition-transform hover:scale-110"
          style={{ background: "var(--plum-rich)" }}
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div
            className="relative w-full md:w-1/2 h-72 md:h-auto min-h-[300px] bg-gradient-to-br from-purple-100 to-violet-200 flex-shrink-0"
          >
            {artwork.image ? (
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30">
                🎨
              </div>
            )}
            {artwork.sold && (
              <div
                className="absolute bottom-4 left-4 text-sm font-semibold px-4 py-1.5 rounded-full text-white"
                style={{ background: "rgba(124,58,237,0.9)" }}
              >
                ✦ Sold
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-7 flex flex-col gap-4 flex-1 overflow-y-auto max-h-[80vh]">
            <div>
              <h2
                className="font-display text-2xl md:text-3xl font-bold leading-tight mb-1"
                style={{ color: "var(--plum-deep)" }}
              >
                {artwork.title}
              </h2>
              {artwork.medium && (
                <p
                  className="font-cormorant italic text-lg"
                  style={{ color: "var(--plum-mid)" }}
                >
                  {artwork.medium}
                  {artwork.year ? ` · ${artwork.year}` : ""}
                </p>
              )}
            </div>

            {artwork.dimensions && (
              <div
                className="text-sm px-3 py-1.5 rounded-full inline-block self-start"
                style={{
                  background: "var(--plum-pale)",
                  color: "var(--plum-rich)",
                }}
              >
                📐 {artwork.dimensions}
              </div>
            )}

            <div
              className="h-px"
              style={{ background: "linear-gradient(90deg, var(--plum-soft), transparent)" }}
            />

            <p className="text-sm leading-relaxed" style={{ color: "#4a2970" }}>
              {artwork.long || artwork.description}
            </p>

            {artwork.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
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

            <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid var(--plum-pale)" }}>
              <span
                className="font-display text-3xl font-bold"
                style={{ color: artwork.sold ? "#9ca3af" : "var(--gold-warm)" }}
              >
                ${artwork.price.toLocaleString()}
              </span>

              {!artwork.sold ? (
                <Link
                  href={`/contact?artwork=${encodeURIComponent(artwork.title)}`}
                  className="btn-primary !py-2.5 !px-5 !text-sm"
                  onClick={onClose}
                >
                  Enquire to Purchase
                </Link>
              ) : (
                <span
                  className="text-sm font-cormorant italic"
                  style={{ color: "var(--plum-soft)" }}
                >
                  This piece has found its home 🦋
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
