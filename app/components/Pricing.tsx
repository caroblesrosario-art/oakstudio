import Link from "next/link";
import Reveal from "./Reveal";
import Asterisk from "./Asterisk";
import { plans, fmt } from "../lib/plans";
import { FOUNDING, foundingApplies, foundingPrice } from "../lib/offer";

export default function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ink/50">
              <Asterisk className="h-3.5 w-3.5 text-periwinkle-500" /> Plans, not proposals
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 text-5xl font-semibold tracking-tightest text-ink sm:text-6xl">
              Fixed pricing.{" "}
              <span className="font-display font-light italic text-ink/80">Pay half to begin.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-ink/55">
              Every plan is 50% to start and 50% on launch. Pick one, pay online,
              and your project code is created on the spot.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 transition-all duration-500 ${
                  p.best
                    ? "border-2 border-ink bg-white shadow-[0_40px_90px_-40px_rgba(11,11,12,0.4)] lg:-translate-y-3"
                    : "border border-ink/10 bg-white/60 hover:-translate-y-1 hover:border-ink/20"
                }`}
              >
                {p.best && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-periwinkle-300 px-4 py-1 text-xs font-semibold text-ink">
                    Most popular
                  </span>
                )}

                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
                  <span className="text-xs uppercase tracking-wider text-ink/35">{p.timeline}</span>
                </div>
                <p className="mt-2 text-sm text-ink/55">{p.tagline}</p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    {fmt(foundingPrice(p))}
                  </span>
                  {foundingApplies(p) ? (
                    <span className="mb-1 flex items-center gap-1.5 text-sm">
                      <span className="text-ink/35 line-through">{fmt(p.price)}</span>
                      <span className="rounded-full bg-periwinkle-100 px-2 py-0.5 text-xs font-semibold text-periwinkle-500">
                        Founding −{FOUNDING.percentOff}%
                      </span>
                    </span>
                  ) : (
                    <span className="mb-1 text-sm text-ink/40">total</span>
                  )}
                </div>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-periwinkle-50 px-3 py-1.5 text-xs font-medium text-periwinkle-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-periwinkle-400" />
                  {fmt(foundingPrice(p) / 2)} to start · {fmt(foundingPrice(p) / 2)} on launch
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-ink/70">
                      <svg
                        className="mt-0.5 shrink-0 text-periwinkle-500"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8.5l3 3 7-7.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/start?plan=${p.id}`}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                    p.best
                      ? "bg-ink text-white hover:shadow-[0_12px_30px_-8px_rgba(11,11,12,0.4)]"
                      : "border border-ink/15 text-ink hover:border-ink/40"
                  }`}
                >
                  Start with {p.name}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-5 flex flex-col items-start justify-between gap-5 rounded-3xl border border-ink/10 bg-white/60 p-7 sm:flex-row sm:items-center sm:p-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <Asterisk className="h-4 w-4 text-periwinkle-500" />
                <h3 className="text-xl font-semibold tracking-tight">
                  Something else in mind?
                </h3>
              </div>
              <p className="mt-2 text-sm text-ink/55">
                Have an <span className="text-ink">exact idea</span> that isn't
                listed, or <span className="text-ink">not sure where to start</span>?
                Tell us what you need — we'll review it and send a custom quote.
                No payment until you approve.
              </p>
            </div>
            <Link
              href="/start?plan=custom"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/40"
            >
              Start a custom request
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
