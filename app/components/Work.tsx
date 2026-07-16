import Reveal from "./Reveal";
import Asterisk from "./Asterisk";

const pieces = [
  { title: "Terra Botanica", type: "Website · E-commerce", tone: "peri", span: "sm:col-span-7", h: "h-[360px]" },
  { title: "Nordfin", type: "Fintech app", tone: "ink", span: "sm:col-span-5", h: "h-[360px]" },
  { title: "Atelier Sol", type: "Brand identity", tone: "sand", span: "sm:col-span-5", h: "h-[320px]" },
  { title: "Loop CRM", type: "Custom CRM", tone: "ink2", span: "sm:col-span-7", h: "h-[320px]" },
];

const toneStyle: Record<string, string> = {
  peri: "linear-gradient(145deg,#E7EDFF 0%,#B8C9FF 55%,#93A9F5 100%)",
  ink: "linear-gradient(150deg,#2A2622 0%,#141210 100%)",
  ink2: "linear-gradient(150deg,#3A342C 0%,#1C1915 100%)",
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
              A peek at the kind of work we ship. Fresh case studies land here
              soon — this space is being curated.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-12">
          {pieces.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className={p.span}>
              <article
                className={`group relative overflow-hidden rounded-[26px] border border-ink/8 ${p.h} w-full`}
                style={{ background: toneStyle[p.tone] }}
              >
                <div className="grain-mini absolute inset-0 opacity-25" />
                {/* label */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div className={p.tone === "peri" || p.tone === "sand" ? "text-ink" : "text-white"}>
                    <p className="text-xl font-semibold tracking-tight">{p.title}</p>
                    <p className={`text-sm ${p.tone === "peri" || p.tone === "sand" ? "text-ink/50" : "text-white/60"}`}>
                      {p.type}
                    </p>
                  </div>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45 ${
                      p.tone === "peri" || p.tone === "sand"
                        ? "bg-ink text-white"
                        : "bg-white text-ink"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                {/* placeholder tag */}
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
