import Reveal from "./Reveal";
import Asterisk from "./Asterisk";
import { asset } from "../lib/asset";

// Real, shipped projects — shown as live embedded previews. Sites that block
// framing (X-Frame-Options) use a static `image` screenshot instead.
const projects = [
  {
    title: "Dronematic",
    type: "LiDAR mapping & drone inspection",
    region: "Dominican Republic",
    url: "https://dronematicrd.com",
  },
  {
    title: "Destiny Chanel",
    type: "Luxury real estate — personal brand",
    region: "Metro Atlanta, USA",
    url: "https://destinychanel.com",
  },
  {
    title: "Madison",
    type: "Commercial photography — portfolio brand",
    region: "Santo Domingo, DR",
    url: "https://madison.do",
    image: "/work/madison.jpg",
  },
];

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
              A live look at what we ship — these are the real, running sites.
              More case studies land here as we curate them.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.url} delay={i * 90}>
              <LivePreviewCard {...p} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-ink/40">
            <Asterisk className="mr-1.5 inline h-3 w-3 align-middle text-periwinkle-500" />
            More work in progress — your project could be next.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function LivePreviewCard({
  title,
  type,
  region,
  url,
  image,
}: {
  title: string;
  type: string;
  region: string;
  url: string;
  image?: string;
}) {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-ink/8 bg-cream shadow-[0_30px_80px_-45px_rgba(20,18,16,0.4)] transition-transform duration-500 hover:-translate-y-1">
      <div className="flex items-center gap-2 border-b border-ink/6 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
        <div className="ml-2 truncate rounded-full bg-paper px-3 py-1 text-[11px] text-ink/40">
          {url.replace(/^https?:\/\//, "")}
        </div>
      </div>

      <div className="relative">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(image)}
            alt={`${title} — website preview`}
            loading="lazy"
            className="h-[300px] w-full object-cover object-top sm:h-[340px]"
          />
        ) : (
          <iframe
            src={url}
            title={`${title} — live preview`}
            loading="lazy"
            tabIndex={-1}
            className="pointer-events-none h-[300px] w-full bg-black sm:h-[340px]"
          />
        )}
        {/* click-catcher so the whole preview opens the site */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${title}`}
          className="absolute inset-0"
        />
      </div>

      <div className="flex items-center justify-between gap-4 p-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600">
              Live
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/55">
            {type} · {region}
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45"
          aria-label={`Visit ${title}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}
