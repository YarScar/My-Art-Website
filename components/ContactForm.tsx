"use client";
// components/ContactForm.tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  useEffect(() => {
    const artwork = params?.get("artwork");
    if (artwork) {
      setForm((prev) => ({
        ...prev,
        message: `Hi! I'm interested in "${artwork}". Could you tell me more about it?`,
      }));
    }
  }, [params]);

  function set(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 bg-white/70 font-body";
  const inputClass = `${inputStyle} border-purple-200 focus:ring-purple-300 focus:border-purple-400`;
  const labelClass =
    "block text-xs font-medium mb-1.5 uppercase tracking-wider";

  return (
    <div
      className="glass rounded-3xl p-8 shadow-xl"
      style={{ boxShadow: "0 12px 40px rgba(124,58,237,0.12)" }}
    >
      {status === "sent" ? (
        <div className="text-center py-8">
          <span className="text-5xl block mb-4">🦋</span>
          <h3
            className="font-display text-2xl font-bold mb-2"
            style={{ color: "var(--plum-deep)" }}
          >
            Message Received!
          </h3>
          <p
            className="font-cormorant italic text-lg"
            style={{ color: "var(--plum-rich)" }}
          >
            Thank you for reaching out. I'll be in touch soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="btn-outline mt-6"
          >
            Send Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className={labelClass}
              style={{ color: "var(--plum-rich)" }}
            >
              Your Name
            </label>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label
              className={labelClass}
              style={{ color: "var(--plum-rich)" }}
            >
              Email Address
            </label>
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="jane@email.com"
            />
          </div>

          <div>
            <label
              className={labelClass}
              style={{ color: "var(--plum-rich)" }}
            >
              Message *
            </label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={6}
              required
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Tell me about the painting you're interested in, or the commission you have in mind..."
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            className="btn-primary w-full justify-center"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message ✦"}
          </button>
        </form>
      )}
    </div>
  );
}
