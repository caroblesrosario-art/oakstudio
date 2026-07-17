import Reveal from "./Reveal";
import Asterisk from "./Asterisk";

// Real, shipped projects (shown as a live embedded preview).
const featured = {
  title: "Dronematic",
  type: "LiDAR mapping & drone inspection",
  region: "Dominican Republic",
  url: "https://dronematicrd.com",
};

// Placeholder slots for upcoming case studies.
const pieces = [
  { title: "Terra Botanica", type: "Website · E-commerce", tone: "peri", span: "sm:col-span-5", h: "h-[300px]" },
  { title: "Loop CRM", type: "Custom CRM", tone: "ink", span: "sm:col-span-7", h: "h-[300px]" },
];

const toneStyle: Record<string, string> = {
  peri: "linear-gradient(145deg,#E7EDFF 0%,#B8C9FF 55%,#93A9F5 100%)",
  ink: "linear-gradient(150deg,#2A2622 0%,#141210 100%)",
  sand: "linear-gradient(150deg,#FBF9F4 0%,#EAE4D8 100%)",
};

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Reveal>
              <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ink/50">
                <Asterisk className="h-3.5 w-3.5 text-periwinkle-500" /> Selected work
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-5xl font-semibold tracking-tightest text-ink sm:text-6xl">
                Recent{" "}
                <span className="font-display font-light italic text-ink/80">builds</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="max-w-xs text-sm text-ink/50">
              A live look at what we ship. More case studies land here as we
              curate them.
            </p>
          </Reveal>
        </div>

        {/* Featured — live embedded preview */}
        <Reveal delay={60}>
          <div className="mt-12 overflow-hidden rounded-[28px] border border-ink/8 bg-cream shadow-[0_40px_100px_-50px_rgba(20,18,16,0.4)]">
            <div className="flex items-center gap-2 border-b border-ink/6 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
              <div className="ml-3 rounded-full bg-paper px-3 py-1 text-[11px] text-ink/40">
                {featured.url.replace(/^https?:\/\//, "")}
              </div>
            </div>
            <div className="relative">
              <iframe
                src={featured.url}
                title={`${featured.title} — live preview`}
                loading="lazy"
                tabIndex={-1}
                className="pointer-events-none h-[320px] w-full bg-black sm:h-[460px]"
              />
              {/* click-catcher so the whole preview opens the site */}
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${featured.title}`}
                className="absolute inset-0"
              />
            </div>
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight">{featured.title}</h3>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600">
                    Live
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/55">
                  {featured.type} · {featured.region}
                </p>
              </div>
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Visit site
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Upcoming case studies */}
        <div className="mt-4 grid gap-4 sm:grid-cols-12">
          {pieces.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className={p.span}>
              <article
                className={`group relative overflow-hidden rounded-[26px] border border-ink/8 ${p.h} w-full`}
                style={{ background: toneStyle[p.tone] }}
              >
                <div className="grain-mini absolute inset-0 opacity-25" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div className={p.tone === "peri" || p.tone === "sand" ? "text-ink" : "text-white"}>
                    <p className="text-xl font-semibold tracking-tight">{p.title}</p>
                    <p className={`text-sm ${p.tone === "peri" || p.tone === "sand" ? "text-ink/50" : "text-white/60"}`}>
                      {p.type}
                    </p>
                  </div>
                </div>
                <span className="absolute right-5 top-5 rounded-full bg-black/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/70 backdrop-blur">
                  Case study soon
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
