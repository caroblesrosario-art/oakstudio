import Reveal from "./Reveal";
import Asterisk from "./Asterisk";

const steps = [
  {
    n: "01",
    title: "Pick a plan",
    body: "Choose the plan that fits your project and scope it online. Clear deliverables, a fixed price — no proposal ping-pong, no discovery calls to book.",
  },
  {
    n: "02",
    title: "Pay 50% to start",
    body: "A 50% deposit kicks things off instantly and generates your unique project code. That code is your key to the whole thing.",
  },
  {
    n: "03",
    title: "Watch it get built",
    body: "Log into your dashboard with your code to see live status, stages, updates and files. Approve designs and leave notes right there — async, on your time.",
  },
  {
    n: "04",
    title: "Launch & settle 50%",
    body: "When it's ready, we deploy and hand everything over. The remaining 50% is only due on launch — you pay for what actually ships.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-white sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(184,201,255,0.9) 0%, rgba(184,201,255,0) 70%)",
        }}
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-periwinkle-300">
              <Asterisk className="h-3.5 w-3.5" /> The OakStudio way
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 text-5xl font-semibold tracking-tightest sm:text-6xl">
              Agency quality, without the{" "}
              <span className="font-display font-light italic">agency friction</span>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-white/55">
              Most studios hide behind meetings and vague timelines. We put your
              whole project behind a single code — so you always know exactly
              where things stand.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="group relative h-full bg-ink p-8 transition-colors duration-500 hover:bg-white/[0.04]">
                <span className="font-display text-5xl font-light text-periwinkle-300/70">
                  {s.n}
                </span>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{s.body}</p>
                {i < steps.length - 1 && (
                  <span className="absolute right-6 top-9 hidden text-white/20 lg:block">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { k: "50 / 50", v: "Pay half to start, half on launch. Never the full amount up front." },
              { k: "1 code", v: "Your project code is your login — no accounts, no passwords to lose." },
              { k: "0 calls", v: "Everything runs async from your dashboard. Talk to a human only if you want to." },
            ].map((f) => (
              <div key={f.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-display text-3xl font-light text-periwinkle-300">{f.k}</p>
                <p className="mt-2 text-sm text-white/55">{f.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
