// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Little Butterfly",
  description: "Reach out to commission a painting or enquire about available works.",
};

export default function ContactPage() {
  return (
    <div className="page-enter pt-28">

      {/* Header */}
      <section
        className="relative py-16 px-6 text-center overflow-hidden"
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
            ✦ Let's Connect ✦
          </p>
          <h1
            className="font-display text-5xl md:text-6xl font-bold mb-5"
            style={{ color: "var(--plum-deep)" }}
          >
            Get in Touch
          </h1>
          <p
            className="font-cormorant italic text-xl leading-relaxed"
            style={{ color: "var(--plum-rich)" }}
          >
            Whether you'd like to commission an original painting, enquire
            about a piece, or simply say hello — I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* Left — info */}
          <div>
            <h2
              className="font-display text-3xl font-bold mb-6"
              style={{ color: "var(--plum-deep)" }}
            >
              I'd Love to Hear From You
            </h2>
            <div
              className="space-y-5 font-cormorant text-xl leading-relaxed"
              style={{ color: "var(--plum-rich)" }}
            >
              <p>
                Every commission starts with a conversation. Tell me about the
                space you have in mind, the colours you love, the story you want
                to tell — and together we'll create something truly yours.
              </p>
              <p>
                I also welcome enquiries about existing works, prints, or
                collaborations. No message is too small.
              </p>
            </div>

            {/* Info cards */}
            <div className="mt-10 space-y-4">
              {[
                {
                  icon: "🎨",
                  title: "Commissions",
                  text: "Custom paintings tailored to your vision and space.",
                },
                {
                  icon: "📦",
                  title: "Shipping",
                  text: "All original works are carefully packaged and shipped worldwide.",
                },
                {
                  icon: "🦋",
                  title: "Response Time",
                  text: "I aim to reply within 1–2 business days.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 items-start glass rounded-2xl p-4"
                >
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <p
                      className="font-display font-semibold text-base mb-0.5"
                      style={{ color: "var(--plum-deep)" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="font-cormorant italic text-base"
                      style={{ color: "var(--plum-rich)" }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
