// app/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ArtworkCard from "@/components/ArtworkCard";

async function getFeaturedArtworks() {
  try {
    return await prisma.artwork.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeaturedArtworks();

  return (
    <div className="page-enter">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%), var(--cream-base)",
        }}
      >
        {/* Background blobs */}
        <div
          className="absolute top-20 left-10 w-80 h-80 blob opacity-20 animate-[blobMorph_8s_ease-in-out_infinite]"
          style={{ background: "var(--plum-soft)" }}
        />
        <div
          className="absolute bottom-24 right-8 w-96 h-96 blob opacity-15 animate-[blobMorph_11s_ease-in-out_infinite_reverse]"
          style={{ background: "var(--gold-light)" }}
        />
        <div
          className="absolute top-40 right-24 w-48 h-48 blob opacity-25 animate-[blobMorph_7s_ease-in-out_infinite]"
          style={{ background: "var(--plum-pale)" }}
        />

        {/* Floating butterflies */}
        <span className="absolute top-28 left-1/4 text-4xl animate-[float_6s_ease-in-out_infinite] opacity-40 select-none pointer-events-none">
          🦋
        </span>
        <span className="absolute top-44 right-1/4 text-2xl animate-[float_8s_ease-in-out_infinite_0.5s] opacity-30 select-none pointer-events-none">
          🦋
        </span>
        <span className="absolute bottom-40 left-1/3 text-xl animate-[float_7s_ease-in-out_infinite_1s] opacity-25 select-none pointer-events-none">
          🦋
        </span>

        {/* Decorative circles */}
        <div
          className="absolute top-1/2 left-0 w-2 h-32 rounded-r-full opacity-30"
          style={{ background: "var(--plum-mid)" }}
        />
        <div
          className="absolute top-24 right-0 w-2 h-24 rounded-l-full opacity-20"
          style={{ background: "var(--gold-warm)" }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
          <p
            className="font-cormorant italic text-lg mb-4 tracking-widest uppercase"
            style={{ color: "var(--plum-mid)" }}
          >
            ✦ Fine Art & Original Paintings ✦
          </p>

          <h1 className="font-display text-6xl md:text-8xl font-bold leading-tight mb-6">
            <span style={{ color: "var(--plum-deep)" }}>Little </span>
            <span className="shimmer-gold">Butterfly</span>
          </h1>

          <p
            className="font-cormorant text-xl md:text-2xl italic max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--plum-rich)" }}
          >
            Each painting is a window into a dream — layered with colour,
            emotion, and the quiet magic of transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/work" className="btn-primary text-base">
              Explore the Gallery ✦
            </Link>
            <Link href="/contact" className="btn-outline text-base">
              Commission a Piece
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 opacity-50">
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--plum-mid)" }}
            >
              Scroll to discover
            </p>
            <div
              className="w-0.5 h-10 animate-pulse"
              style={{ background: "var(--plum-soft)" }}
            />
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ────────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, var(--plum-mid) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p
              className="font-cormorant italic tracking-widest text-sm uppercase mb-2"
              style={{ color: "var(--gold-warm)" }}
            >
              ✦ Recent Works ✦
            </p>
            <h2
              className="font-display text-4xl md:text-5xl font-semibold"
              style={{ color: "var(--plum-deep)" }}
            >
              From the Studio
            </h2>
            <div
              className="w-16 h-0.5 mx-auto mt-4 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--plum-soft), transparent)",
              }}
            />
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featured.map((artwork, i) => (
                <div
                  key={artwork.id}
                  style={{ animationDelay: `${i * 0.15}s` }}
                  className="page-enter"
                >
                  <ArtworkCard artwork={artwork} />
                </div>
              ))}
            </div>
          ) : (
            /* Placeholder cards when no DB data yet */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Violet Dream",
                  medium: "Oil on Canvas",
                  price: 480,
                  emoji: "🎨",
                  color: "from-purple-200 to-violet-300",
                },
                {
                  title: "Golden Hour",
                  medium: "Acrylic",
                  price: 320,
                  emoji: "🌅",
                  color: "from-amber-100 to-yellow-300",
                },
                {
                  title: "Morpho Flight",
                  medium: "Watercolour",
                  price: 260,
                  emoji: "🦋",
                  color: "from-blue-100 to-purple-200",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="artwork-card glass rounded-3xl overflow-hidden shadow-md"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div
                    className={`h-56 bg-gradient-to-br ${p.color} flex items-center justify-center text-6xl`}
                  >
                    {p.emoji}
                  </div>
                  <div className="p-5">
                    <h3
                      className="font-display text-xl font-semibold mb-1"
                      style={{ color: "var(--plum-deep)" }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="text-sm font-cormorant italic mb-3"
                      style={{ color: "var(--plum-mid)" }}
                    >
                      {p.medium}
                    </p>
                    <p
                      className="font-semibold text-lg"
                      style={{ color: "var(--gold-warm)" }}
                    >
                      ${p.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/work" className="btn-outline">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUOTE BAND ───────────────────────────────────────── */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--plum-deep) 0%, var(--plum-rich) 50%, #6d28d9 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-4xl mb-6 block">🦋</span>
          <blockquote
            className="font-display text-2xl md:text-4xl italic text-white font-light leading-relaxed"
          >
            "Art is not what you see, but what you make others see."
          </blockquote>
          <p
            className="mt-6 font-cormorant italic text-lg"
            style={{ color: "var(--plum-soft)" }}
          >
            — Edgar Degas
          </p>
        </div>
      </section>

      {/* ── COMMISSION CTA ───────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="font-cormorant italic text-sm tracking-widest uppercase mb-3"
            style={{ color: "var(--gold-warm)" }}
          >
            ✦ Own a Piece ✦
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold mb-5 leading-tight"
            style={{ color: "var(--plum-deep)" }}
          >
            Commission Your Original Painting
          </h2>
          <p
            className="font-cormorant text-xl italic mb-8 leading-relaxed"
            style={{ color: "var(--plum-rich)" }}
          >
            Each commission is a collaboration — tell me your vision, your
            space, your story, and I will transform it into something
            beautiful and entirely yours.
          </p>
          <Link href="/contact" className="btn-primary text-base">
            Start a Conversation ✦
          </Link>
        </div>
      </section>
    </div>
  );
}
