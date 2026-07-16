import Image from "next/image";
import Reveal from "./Reveal";
import Asterisk from "./Asterisk";
import { asset } from "../lib/asset";

const stats = [
  { k: "Design + code", v: "One team, end to end" },
  { k: "Async-first", v: "Built around your time" },
  { k: "Fixed scope", v: "No surprise invoices" },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ink/50">
                <Asterisk className="h-3.5 w-3.5 text-periwinkle-500" /> The studio
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-5xl font-semibold tracking-tightest text-ink sm:text-6xl">
                Rooted in craft,
                <br />
                <span className="font-display font-light italic text-ink/80">
                  built like software
                </span>
                .
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/60">
                <p>
                  OakStudio is a small design & coding studio for founders and
                  teams who want agency-grade work without the agency overhead.
                  We design and build the whole thing — websites, apps, CRMs and
                  the ads that bring people to them.
                </p>
                <p>
                  The oak is our compass: patient, structured, made to last. We
                  bring that to every build, and we wrap it in a process that's
                  radically transparent — so you're never wondering where your
                  project stands.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.k} className="rounded-2xl border border-ink/8 bg-white/60 p-4">
                    <p className="text-sm font-semibold text-ink">{s.k}</p>
                    <p className="mt-1 text-xs text-ink/50">{s.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Brand panel */}
          <Reveal delay={120}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-[32px] border border-ink/8 bg-white p-10 shadow-[0_40px_100px_-50px_rgba(11,11,12,0.35)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-70 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(184,201,255,0.6) 0%, rgba(184,201,255,0) 70%)",
                  }}
                />
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-40 w-40 items-center justify-center rounded-full bg-paper">
                    <Image src={asset("/oak-mark.svg")} alt="OakStudio mark" width={110} height={110} />
                  </div>
                  <p className="mt-8 font-display text-2xl font-light italic text-ink/80">
                    “Plant it right,
                    <br /> and it grows on its own.”
                  </p>
                  <div className="mt-8 h-px w-full bg-ink/8" />
                  <div className="mt-6 grid w-full grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-2xl font-semibold">100%</p>
                      <p className="text-xs text-ink/50">Custom, no templates</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">24/7</p>
                      <p className="text-xs text-ink/50">Dashboard access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
