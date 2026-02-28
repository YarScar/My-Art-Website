// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative mt-24 py-12 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, var(--plum-deep) 0%, var(--plum-rich) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-10 blob"
        style={{ background: "var(--gold-warm)", transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 opacity-10 blob"
        style={{ background: "var(--plum-soft)", transform: "translate(-30%, 30%)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-2xl">🦋</span>
              <span className="font-display text-xl font-semibold text-white">
                Little Butterfly
              </span>
            </div>
            <p
              className="font-cormorant italic text-lg"
              style={{ color: "var(--plum-soft)" }}
            >
              Fine Art & Original Paintings
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 justify-center">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/work", label: "My Work" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-colors duration-200"
                style={{ color: "rgba(220,180,255,0.8)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          className="mt-10 pt-6 text-center text-xs"
          style={{
            borderTop: "1px solid rgba(192,132,252,0.2)",
            color: "rgba(192,132,252,0.6)",
          }}
        >
          © {new Date().getFullYear()} Little Butterfly. All artworks are
          original and protected by copyright.
        </div>
      </div>
    </footer>
  );
}
