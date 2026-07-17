import Reveal from "./Reveal";
import Asterisk from "./Asterisk";

// ─────────────────────────────────────────────────────────────
// REAL client words only.
//
// Paste what a client actually sent you — nothing invented. The section
// renders only when this array has entries, so an empty list simply hides
// it rather than shipping filler to people about to pay you.
//
// Two is plenty to start. To add one, uncomment the shape below:
//
//   {
//     quote: "What they actually wrote, trimmed but not reworded.",
//     name: "Their name",
//     role: "Their title, Company",
//   },
// ─────────────────────────────────────────────────────────────
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  // ← paste real ones here (Dronematic, Destiny Chanel)
];

export default function Testimonials() {
  // Nothing real to show yet → show nothing.
  if (testimonials.length === 0) return null;

  return (
    <section id="words" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ink/50">
              <Asterisk className="h-3.5 w-3.5 text-periwinkle-500" /> In their words
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 text-5xl font-semibold tracking-tightest text-ink sm:text-6xl">
              People who{" "}
              <span className="font-display font-light italic text-ink/80">
                said yes.
              </span>
            </h2>
          </Reveal>
        </div>

        <div
          className={`mx-auto mt-14 grid gap-5 ${
            testimonials.length === 1 ? "max-w-2xl" : "max-w-5xl md:grid-cols-2"
          }`}
        >
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-ink/8 bg-white/60 p-8">
                <Asterisk className="h-5 w-5 text-periwinkle-300" />
                <blockquote className="mt-5 text-xl leading-relaxed text-ink/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-ink/8 pt-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-periwinkle-100 text-sm font-medium text-periwinkle-500">
                    {t.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">{t.name}</span>
                    <span className="block text-xs text-ink/45">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
