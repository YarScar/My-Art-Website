"use client";
// components/WorkGallery.tsx
import { useState } from "react";
import ArtworkCard from "./ArtworkCard";
import AdminPanel from "./AdminPanel";
import { useAdmin } from "@/components/AdminContext";

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

type FilterType = "all" | "available" | "sold";

export default function WorkGallery({
  artworks: initial,
}: {
  artworks: Artwork[];
}) {
  const [artworks, setArtworks] = useState(initial);
  const [filter, setFilter] = useState<FilterType>("all");
  const [adminOpen, setAdminOpen] = useState(false);

  // isAdmin comes from AdminContext — true only after the correct password is entered
  const { isAdmin } = useAdmin();

  const filtered = artworks.filter((a) => {
    if (filter === "available") return !a.sold;
    if (filter === "sold") return a.sold;
    return true;
  });

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All Works" },
    { key: "available", label: "Available" },
    { key: "sold", label: "Sold" },
  ];

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f.key
                  ? "text-white shadow-md"
                  : "text-purple-800 hover:bg-purple-50"
              }`}
              style={
                filter === f.key
                  ? {
                      background:
                        "linear-gradient(135deg, var(--plum-rich), var(--plum-mid))",
                    }
                  : { background: "var(--plum-pale)" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span
            className="text-sm font-cormorant italic"
            style={{ color: "var(--plum-mid)" }}
          >
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </span>
          {/* Only show the Add Artwork button if admin mode is unlocked */}
          {isAdmin && (
            <button
              onClick={() => setAdminOpen(true)}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={{
                borderColor: "var(--plum-soft)",
                color: "var(--plum-rich)",
              }}
            >
              + Add Artwork
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {filtered.map((artwork, i) => (
            <div
              key={artwork.id}
              className="page-enter"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <ArtworkCard artwork={artwork} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <span className="text-6xl block mb-4">🦋</span>
          <p
            className="font-cormorant italic text-2xl"
            style={{ color: "var(--plum-mid)" }}
          >
            {filter === "sold"
              ? "No sold pieces yet."
              : "No artworks here yet. Add your first piece!"}
          </p>
        </div>
      )}

      {adminOpen && (
        <AdminPanel
          onClose={() => setAdminOpen(false)}
          // onSaved: called after a NEW artwork is created — adds it to the top of the gallery
          onSaved={(newArtwork) => {
            setArtworks((prev) => [newArtwork, ...prev]);
            setAdminOpen(false);
          }}
          // onUpdated: called after an EXISTING artwork is edited — replaces the old card
          onUpdated={(updated) => {
            setArtworks((prev) =>
              prev.map((a) => (a.id === updated.id ? updated : a))
            );
          }}
          // onDeleted: called after an artwork is deleted — removes it from the gallery
          onDeleted={(id) => {
            setArtworks((prev) => prev.filter((a) => a.id !== id));
          }}
        />
      )}
    </div>
  );
}
