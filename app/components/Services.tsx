import Reveal from "./Reveal";
import Asterisk from "./Asterisk";

const services = [
  {
    title: "Website Design",
    tag: "Sites that convert",
    body: "Marketing sites, landing pages and e-commerce — designed and built to feel fast, premium and unmistakably yours.",
    points: ["Design + build", "CMS handoff", "SEO-ready", "Analytics wired"],
    icon: (
      <path
        d="M4 7h24M4 7a3 3 0 013-3h18a3 3 0 013 3M4 7v18a3 3 0 003 3h18a3 3 0 003-3V7M9 4v3M13 4v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "App Design",
    tag: "iOS · Android · Web",
    body: "Product design for mobile and web apps — flows, UI systems and prototypes ready to ship to engineering or built by us.",
    points: ["UX flows", "Design system", "Prototype", "Dev-ready specs"],
    icon: (
      <path
        d="M11 3h10a2 2 0 012 2v22a2 2 0 01-2 2H11a2 2 0 01-2-2V5a2 2 0 012-2zM14 25h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "CRM Design",
    tag: "Operations, streamlined",
    body: "Custom dashboards and internal tools that fit how you actually work — pipelines, clients and data in one clean surface.",
    points: ["Custom pipelines", "Dashboards", "Automations", "Role access"],
    icon: (
      <path
        d="M4 6h24v8H4zM4 18h11v8H4zM19 18h9v8h-9z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "Ads & Creative",
    tag: "Performance creative",
    body: "Scroll-stopping ad creative and campaign assets for Meta, Google and TikTok — designed to be tested and to perform.",
    points: ["Static + motion", "A/B variants", "Campaign kits", "Copy included"],
    icon: (
      <path
        d="M6 12v8l14 6V6L6 12zM6 12H4a2 2 0 00-2 2v4a2 2 0 002 2h2M22 10a5 5 0 010 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ink/50">
              <Asterisk className="h-3.5 w-3.5 text-periwinkle-500" /> What we do
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 text-5xl font-semibold tracking-tightest text-ink sm:text-6xl">
              Four services,{" "}
              <span className="font-display font-light italic text-ink/80">one studio</span>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-lg text-ink/55">
              Everything under one roof, so your brand stays coherent from the
              first pixel to launch day — and every project runs on the same
              transparent system.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <article className="group card h-full p-7 hover:-translate-y-1 hover:border-ink/12 hover:shadow-[0_30px_60px_-30px_rgba(11,11,12,0.25)] sm:p-9">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-paper text-ink transition-colors duration-500 group-hover:bg-periwinkle-100">
                    <svg width="30" height="30" viewBox="0 0 32 32">
                      {s.icon}
                    </svg>
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-ink/35">
                    {s.tag}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/55">{s.body}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-ink/8 bg-white/60 px-3 py-1 text-xs text-ink/60"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-3xl border border-ink/8 bg-ink px-8 py-7 text-white sm:flex-row">
            <div>
              <p className="text-lg font-medium">Need branding too?</p>
              <p className="text-sm text-white/60">
                Logos, identity systems and guidelines — bundled with any plan.
              </p>
            </div>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              See the plans
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
