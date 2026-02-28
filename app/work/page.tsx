// app/work/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import WorkGallery from "@/components/WorkGallery";

export const metadata: Metadata = {
  title: "My Work — Little Butterfly",
  description: "Browse original paintings and fine art available for purchase.",
};

async function getArtworks() {
  try {
    return await prisma.artwork.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function WorkPage() {
  const artworks = await getArtworks();

  return (
    <div className="page-enter pt-28">

      {/* Header */}
      <section
        className="relative py-16 px-6 overflow-hidden text-center"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%), var(--cream-base)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-72 h-72 blob opacity-15"
          style={{ background: "var(--plum-soft)", transform: "translate(20%, -20%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-56 h-56 blob opacity-10"
          style={{ background: "var(--gold-light)", transform: "translate(-20%, 20%)" }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p
            className="font-cormorant italic tracking-widest text-sm uppercase mb-3"
            style={{ color: "var(--gold-warm)" }}
          >
            ✦ The Collection ✦
          </p>
          <h1
            className="font-display text-5xl md:text-6xl font-bold mb-5"
            style={{ color: "var(--plum-deep)" }}
          >
            My Work
          </h1>
          <p
            className="font-cormorant italic text-xl leading-relaxed"
            style={{ color: "var(--plum-rich)" }}
          >
            Each painting is an original, one-of-a-kind work made with care
            and intention. Click any piece to learn more.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <WorkGallery artworks={artworks} />
        </div>
      </section>
    </div>
  );
}
