// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Little Butterfly",
  description: "The story and inspiration behind Little Butterfly fine art.",
};

export default function AboutPage() {
  return (
    <div className="page-enter pt-28">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative py-20 px-6 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%), var(--cream-base)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 blob opacity-15 animate-[blobMorph_9s_ease-in-out_infinite]"
          style={{ background: "var(--plum-soft)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 blob opacity-10"
          style={{ background: "var(--gold-light)", transform: "translate(-30%, 30%)" }}
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p
            className="font-cormorant italic tracking-widest text-sm uppercase mb-3"
            style={{ color: "var(--gold-warm)" }}
          >
            ✦ The Artist ✦
          </p>
          <h1
            className="font-display text-5xl md:text-7xl font-bold mb-6"
            style={{ color: "var(--plum-deep)" }}
          >
            About Me
          </h1>
          <p
            className="font-cormorant italic text-xl md:text-2xl leading-relaxed"
            style={{ color: "var(--plum-rich)" }}
          >
            A painter captivated by colour, transformation, and the beauty
            that lives in quiet, fleeting moments.
          </p>
        </div>
      </section>

      {/* ── STORY ──────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Portrait placeholder */}
          <div className="relative">
            <div
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden blob shadow-2xl"
              style={{
                background: "linear-gradient(160deg, var(--plum-pale) 0%, rgba(192,132,252,0.4) 50%, var(--gold-light) 100%)",
                boxShadow: "0 24px 60px rgba(74,16,112,0.2)",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <span className="text-8xl" style={{ filter: "drop-shadow(0 0 20px rgba(192,132,252,0.8))" }}>
                  🦋
                </span>
                <p
                  className="font-cormorant italic text-lg text-center px-8"
                  style={{ color: "var(--plum-rich)" }}
                >
                  Replace with your photo
                </p>
              </div>
            </div>

            {/* Floating accent */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, var(--plum-rich), var(--plum-mid))" }}
            >
              <span className="text-white font-display font-bold text-xs text-center leading-tight px-2">
                Fine<br />Art
              </span>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2
              className="font-display text-4xl font-bold mb-6 leading-snug"
              style={{ color: "var(--plum-deep)" }}
            >
              Hello, I'm the artist behind{" "}
              <span className="shimmer-plum">Little Butterfly</span>
            </h2>

            <div
              className="space-y-4 font-cormorant text-xl leading-relaxed"
              style={{ color: "var(--plum-rich)" }}
            >
              <p>
                My journey with painting began not in a classroom, but in the
                quiet corners of childhood — in the way light shifted across a
                window, the way a butterfly paused on a flower just long enough
                to study its wings.
              </p>
              <p>
                I work primarily in oils and acrylics, drawn to the richness of
                layered colour and the meditative rhythm of building a painting
                stroke by stroke. Each piece I create begins with an emotion or
                a memory — something I want to hold onto a little longer.
              </p>
              <p>
                Little Butterfly was born from the belief that art has the power
                to transform a space and the spirit within it. I hope my work
                finds walls where it can breathe, and hearts where it resonates.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/work" className="btn-primary">
                View My Paintings ✦
              </Link>
              <Link href="/contact" className="btn-outline">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, var(--cream-warm) 0%, var(--plum-pale) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="font-cormorant italic tracking-widest text-sm uppercase mb-2"
              style={{ color: "var(--gold-warm)" }}
            >
              ✦ My Process ✦
            </p>
            <h2
              className="font-display text-4xl font-bold"
              style={{ color: "var(--plum-deep)" }}
            >
              How a Painting Comes to Life
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✨",
                step: "01",
                title: "Inspiration",
                text: "Every painting starts with a feeling — a fragment of light, a memory, or a dream that won't let go until it finds form on canvas.",
              },
              {
                icon: "🎨",
                step: "02",
                title: "Creation",
                text: "I build layers slowly, mixing colour intuitively, letting the painting breathe and evolve. Sometimes it surprises me as much as it might you.",
              },
              {
                icon: "🦋",
                step: "03",
                title: "Transformation",
                text: "When the painting is finished, it takes on a life of its own — ready to find its home and bring something beautiful into your world.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="glass rounded-3xl p-8 text-center relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 font-display text-7xl font-bold opacity-5 select-none"
                  style={{ color: "var(--plum-mid)" }}
                >
                  {item.step}
                </div>
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3
                  className="font-display text-xl font-semibold mb-3"
                  style={{ color: "var(--plum-deep)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-cormorant text-lg leading-relaxed"
                  style={{ color: "var(--plum-rich)" }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "50+", label: "Original Paintings" },
            { value: "30+", label: "Happy Collectors" },
            { value: "5+", label: "Years Painting" },
            { value: "∞", label: "Creative Passion" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-display text-4xl md:text-5xl font-bold shimmer-gold"
                style={{ fontStyle: "normal" }}
              >
                {stat.value}
              </p>
              <p
                className="font-cormorant italic text-base mt-2"
                style={{ color: "var(--plum-rich)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
