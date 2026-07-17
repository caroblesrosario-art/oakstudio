import Reveal from "./Reveal";
import Asterisk from "./Asterisk";

// ─────────────────────────────────────────────────────────────
// Risk reversal — the objection-killer right after the price.
//
// The four promises below are SAFE: each one only restates something the
// plans already deliver (fixed price, included revisions, custom = pay-on-
// approval, full tracking). Nothing here commits you to anything new.
//
// The stronger, conversion-heavy promise — a money-back guarantee — is a
// financial commitment only you can make, so it's OFF by default. To turn it
// on, set MONEY_BACK to a sentence you're willing to honor, e.g.:
//   const MONEY_BACK = "Don't love your first concept? Your deposit back, no questions.";
// Leave it as "" and the card stays hidden.
// ─────────────────────────────────────────────────────────────
const MONEY_BACK = "";

const promises = [
  {
    title: "The price is the price",
    body: "Every plan is a fixed number, agreed up front. No surprise invoices, no scope-creep bills at the end.",
  },
  {
    title: "Revisions are built in",
    body: "You get real revision rounds on every plan — and unlimited within scope on Studio. Changes come with the work, not as extras.",
  },
  {
    title: "Custom? Pay nothing to ask",
    body: "Send a custom request and you only pay once you've seen and approved the quote. No commitment to find out.",
  },
  {
    title: "Everything, in the open",
    body: "One code shows you progress, updates, files and payments — anytime, from any device. No black box, no chasing.",
  },
];

export default function Guarantee() {
  return (
    <section id="promise" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ink/50">
              <Asterisk className="h-3.5 w-3.5 text-periwinkle-500" /> No surprises
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 text-5xl font-semibold tracking-tightest text-ink sm:text-6xl">
              Paying up front,{" "}
              <span className="font-display font-light italic text-ink/80">
                without the worry.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-ink/55">
              You&apos;re trusting someone you haven&apos;t met with a deposit. Here&apos;s
              what that deposit buys you — guaranteed.
            </p>
          </Reveal>
        </div>

        {MONEY_BACK && (
          <Reveal delay={140}>
            <div className="mx-auto mt-12 flex max-w-3xl items-center gap-4 rounded-3xl border border-ink/12 bg-ink px-8 py-6 text-cream">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-periwinkle-300 text-ink">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-lg font-medium">{MONEY_BACK}</p>
            </div>
          </Reveal>
        )}

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {promises.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="h-full">
              <div className="flex h-full gap-4 rounded-3xl border border-ink/8 bg-white/60 p-7">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-periwinkle-100 text-periwinkle-500">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
