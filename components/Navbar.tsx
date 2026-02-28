"use client";
// components/Navbar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAdmin } from "@/components/AdminContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "My Work" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // openPasswordModal: opens the secret admin password popup
  const { openPasswordModal, isAdmin, lockAdmin } = useAdmin();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-purple-100/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group">
          {/* 🦋 is now a secret button — clicking it opens the admin password modal.
              It looks exactly like before to visitors; only you know to click it. */}
          <button
            onClick={openPasswordModal}
            className="text-2xl leading-none focus:outline-none"
            style={{ filter: "drop-shadow(0 0 8px rgba(192,132,252,0.6))" }}
            aria-label=""
            tabIndex={-1}
          >
            🦋
          </button>
          {/* "Little Butterfly" text still navigates home */}
          <Link
            href="/"
            className="font-display text-xl font-semibold"
            style={{ color: "var(--plum-rich)" }}
          >
            Little Butterfly
          </Link>
          {/* Small green dot + Exit button shown only when admin is unlocked */}
          {isAdmin && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" title="Admin mode on" />
              <button
                onClick={lockAdmin}
                className="text-xs px-2.5 py-1 rounded-full border transition-colors ml-1"
                style={{ borderColor: "var(--plum-soft)", color: "var(--plum-rich)" }}
                title="Exit admin mode"
              >
                🔒 Exit Admin
              </button>
            </>
          )}
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    active
                      ? "text-white"
                      : "text-purple-800 hover:text-purple-600"
                  }`}
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(135deg, var(--plum-rich), var(--plum-mid))",
                        }
                      : {}
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/contact" className="btn-primary ml-2 !py-2 !px-5 !text-sm">
              Commission a Piece ✦
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-purple-800 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-purple-800 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-purple-800 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass mx-4 mt-2 rounded-2xl p-4 flex flex-col gap-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "text-white"
                    : "text-purple-800 hover:bg-purple-50"
                }`}
                style={
                  active
                    ? {
                        background:
                          "linear-gradient(135deg, var(--plum-rich), var(--plum-mid))",
                      }
                    : {}
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
