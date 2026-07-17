import Link from "next/link";
import Reveal from "./Reveal";
import Asterisk from "./Asterisk";

// Every answer here is grounded in what the plans actually promise — if a plan
// changes, this copy has to change with it.
const faqs: { q: string; a: React.ReactNode; plain: string }[] = [
  {
    q: "Do we need to get on a call?",
    a: (
      <>
        No — that&apos;s the whole point. You pick a plan and shape your brief in
        a few taps, and everything after that lives in your dashboard: progress,
        updates, files and comments. You&apos;ll never have to sit through a
        status meeting.
      </>
    ),
    plain:
      "No. You pick a plan and shape your brief in a few taps, and everything after that lives in your dashboard: progress, updates, files and comments. There are no status meetings.",
  },
  {
    q: "How long does it take?",
    a: (
      <>
        Launch is about 2 weeks, Signature about 4, and Studio about 8 — counted
        from the day your brief and deposit land, not from a kickoff call three
        weeks later.
      </>
    ),
    plain:
      "Launch takes about 2 weeks, Signature about 4 weeks, and Studio about 8 weeks, counted from the day your brief and deposit arrive.",
  },
  {
    q: "How does paying work?",
    a: (
      <>
        Every plan is 50% to start and 50% on launch, paid by card or PayPal. The
        moment your deposit clears, your project code is created and your
        dashboard goes live.
      </>
    ),
    plain:
      "Every plan is 50% to start and 50% on launch, paid by card or PayPal. Your project code and dashboard are created as soon as the deposit clears.",
  },
  {
    q: "What if I want changes?",
    a: (
      <>
        Revisions are built into every plan: 1 round on Launch, 2 on Signature,
        and unlimited within scope on Studio. You leave your notes directly in
        your dashboard — no email threads to dig through.
      </>
    ),
    plain:
      "Revisions are included in every plan: 1 round on Launch, 2 rounds on Signature, and unlimited within scope on Studio. You leave notes directly in your dashboard.",
  },
  {
    q: "What do you need from me?",
    a: (
      <>
        Your brief — which is mostly tapping what fits — plus any logo, copy or
        images you already have. If you&apos;re not sure what you want yet,
        that&apos;s a normal place to start: say so in the brief and we&apos;ll
        shape it together.
      </>
    ),
    plain:
      "Your brief, which is mostly tapping what fits, plus any logo, copy or images you already have. If you are not sure what you want yet, you can say so in the brief.",
  },
  {
    q: "What if my project isn't one of the plans?",
    a: (
      <>
        Send a{" "}
        <Link
          href="/start?plan=custom"
          className="font-medium text-ink underline underline-offset-4"
        >
          custom request
        </Link>
        . Tell us what you need — or what you&apos;re unsure about — and
        we&apos;ll review it and send you a quote. There&apos;s no payment until
        you approve it.
      </>
    ),
    plain:
      "Send a custom request. Tell us what you need, or what you are unsure about, and we will review it and send you a quote. There is no payment until you approve it.",
  },
  {
    q: "How do I keep track of everything?",
    a: (
      <>
        With one code. Every project gets one (like{" "}
        <span className="font-mono text-ink/70">OAK-2049</span>) the moment it
        starts. Enter it at{" "}
        <Link
          href="/dashboard"
          className="font-medium text-ink underline underline-offset-4"
        >
          your dashboard
        </Link>{" "}
        from any device to see progress, updates, payments and files.
      </>
    ),
    plain:
      "With one code. Every project gets a code like OAK-2049 the moment it starts. Enter it at the dashboard from any device to see progress, updates, payments and files.",
  },
];

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.plain },
    })),
  };

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ink/50">
              <Asterisk className="h-3.5 w-3.5 text-periwinkle-500" /> Good questions
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 text-5xl font-semibold tracking-tightest text-ink sm:text-6xl">
              Before you{" "}
              <span className="font-display font-light italic text-ink/80">ask.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-ink/55">
              The things people want to know before handing a project to someone
              they haven&apos;t met.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <details className="group border-b border-ink/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                  <span className="text-lg font-medium text-ink">{f.q}</span>
                  <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition-colors group-open:border-ink group-open:bg-ink group-open:text-white">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path
                        d="M6 2.5v7M2.5 6h7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="origin-center transition-transform duration-300 group-open:rotate-45"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl pr-12 text-ink/60">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-10 text-center text-sm text-ink/45">
            Still unsure?{" "}
            <Link
              href="/start?plan=custom"
              className="font-medium text-ink underline underline-offset-4"
            >
              Send a custom request
            </Link>{" "}
            — it&apos;s free, and there&apos;s no commitment until you approve the
            quote.
          </p>
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
