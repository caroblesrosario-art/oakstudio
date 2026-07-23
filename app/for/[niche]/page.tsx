import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import FoundingBar from "../../components/FoundingBar";
import Nav from "../../components/Nav";
import Pricing from "../../components/Pricing";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import Asterisk from "../../components/Asterisk";

// Industry landing pages — one per niche, built to be linked in cold outreach
// ("here's what I do for companies like yours") and to rank for that niche.
// Proof is a REAL OakStudio client in that exact industry.
interface Niche {
  eyebrow: string;
  h1a: string;
  h1b: string;
  sub: string;
  painLead: string;
  pains: string[];
  wins: string[];
  proof: { name: string; type: string; url: string; blurb: string };
  metaTitle: string;
  metaDesc: string;
}

const NICHES: Record<string, Niche> = {
  "surveying-companies": {
    eyebrow: "For drone & surveying companies",
    h1a: "Websites for drone & survey firms that look as",
    h1b: "sharp as your data.",
    sub: "Your fieldwork is accurate to the centimeter. Your website should look just as precise — and win you the contracts to match.",
    painLead: "Most survey & geomatics websites quietly cost their firms work.",
    pains: [
      "Outdated, template sites that don't reflect survey-grade precision",
      "No clean way to show off LiDAR, orthomosaics, 3D models or mapping deliverables",
      "Losing bids to competitors who simply look more established online",
    ],
    wins: [
      "A premium site that makes your firm look as advanced as your equipment",
      "Your deliverables and case work presented like the technical assets they are",
      "Built to win trust from engineers, developers, mining and gov clients",
    ],
    proof: {
      name: "Dronematic",
      type: "Drone topography & surveying · Dominican Republic",
      url: "https://dronematicrd.com",
      blurb:
        "We designed and built the site for Dronematic, a drone-based topography and surveying company — the exact industry you're in.",
    },
    metaTitle: "Websites for drone & surveying companies",
    metaDesc:
      "OakStudio builds premium, fixed-price websites for drone, topographic-survey and geomatics firms — no meetings, live in ~2 weeks. Look as precise as your fieldwork.",
  },
  "real-estate": {
    eyebrow: "For real estate agents & brokerages",
    h1a: "Real estate websites that turn listings into",
    h1b: "leads.",
    sub: "Buyers judge you in seconds. A premium site makes you the obvious choice — and turns browsers into booked showings.",
    painLead: "Most agent websites look like every other agent's.",
    pains: [
      "Generic template sites that blend into the crowd",
      "Listings that don't feel premium enough for the price point",
      "No clear path to capture and follow up with leads",
    ],
    wins: [
      "A distinctive personal brand that makes you memorable",
      "Listings and neighborhoods presented like a luxury catalog",
      "Lead capture wired in, so inquiries actually reach you",
    ],
    proof: {
      name: "Destiny Chanel",
      type: "Luxury real estate — personal brand · Metro Atlanta, USA",
      url: "https://destinychanel.com",
      blurb:
        "We designed and built the personal-brand site for Destiny Chanel, a luxury real estate professional.",
    },
    metaTitle: "Websites for real estate agents & brokerages",
    metaDesc:
      "OakStudio builds premium, fixed-price websites for real estate agents and brokerages — no meetings, live in ~2 weeks. Turn listings into leads.",
  },
};

export function generateStaticParams() {
  return Object.keys(NICHES).map((niche) => ({ niche }));
}

export function generateMetadata({ params }: { params: { niche: string } }): Metadata {
  const n = NICHES[params.niche];
  if (!n) return {};
  return {
    title: n.metaTitle,
    description: n.metaDesc,
    alternates: { canonical: `/for/${params.niche}/` },
    openGraph: {
      title: `${n.metaTitle} · OakStudio`,
      description: n.metaDesc,
      url: `https://oakstudio.cloud/for/${params.niche}/`,
    },
  };
}

export default function NicheLanding({ params }: { params: { niche: string } }) {
  const n = NICHES[params.niche];
  if (!n) notFound();

  return (
    <main className="relative">
      <FoundingBar />
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20">
        <div className="container-x">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ink/50">
              <Asterisk className="h-3.5 w-3.5 text-periwinkle-500" /> {n.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tightest text-ink sm:text-7xl">
              {n.h1a}{" "}
              <span className="font-display font-light italic text-ink/80">{n.h1b}</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-2xl text-lg text-ink/60">{n.sub}</p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/start" className="btn-primary">
                Start a project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/start?plan=custom"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/40"
              >
                Get a free quote
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section className="border-y border-ink/8 bg-white/50 py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {n.painLead}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {n.pains.map((p, i) => (
              <Reveal key={p} delay={i * 80}>
                <div className="h-full rounded-2xl border border-ink/8 bg-cream p-6">
                  <span className="text-sm font-semibold text-periwinkle-500">0{i + 1}</span>
                  <p className="mt-3 text-ink/70">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-ink/50">
              <Asterisk className="h-3.5 w-3.5 text-periwinkle-500" /> What you get
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tightest sm:text-5xl">
              A site built to{" "}
              <span className="font-display font-light italic text-ink/80">win the work.</span>
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {n.wins.map((w, i) => (
              <Reveal key={w} delay={i * 80} as="li">
                <div className="flex items-start gap-3">
                  <svg className="mt-1 shrink-0 text-periwinkle-500" width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3 3 7-7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-ink/75">{w}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof — a real client in this niche */}
      <section className="py-8 sm:py-12">
        <div className="container-x">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-ink/8 bg-ink text-white">
              <div className="grid gap-8 p-8 sm:grid-cols-2 sm:items-center sm:p-12">
                <div>
                  <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/50">
                    <Asterisk className="h-3.5 w-3.5 text-periwinkle-300" /> We've done it in your world
                  </span>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight">{n.proof.name}</h2>
                  <p className="mt-1 text-sm text-white/50">{n.proof.type}</p>
                  <p className="mt-4 text-white/70">{n.proof.blurb}</p>
                  <a
                    href={n.proof.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
                  >
                    Visit the live site
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <p className="font-display text-2xl font-light italic leading-snug text-white/85">
                    &ldquo;Fixed price, no meetings, live in about two weeks — and you track the
                    whole thing from your own dashboard.&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-white/45">— how every OakStudio project runs</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <h2 className="text-center text-4xl font-semibold tracking-tightest sm:text-5xl">
              How it{" "}
              <span className="font-display font-light italic text-ink/80">works.</span>
            </h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {[
              { t: "Pick a plan", d: "Fixed scope, fixed price. No quotes, no back-and-forth." },
              { t: "Shape your brief", d: "A few taps — no meetings. Add references and a moodboard." },
              { t: "Track your build", d: "Follow progress, files and messages from one dashboard." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <div className="h-full rounded-2xl border border-ink/8 bg-white/60 p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-periwinkle-100 text-sm font-semibold text-periwinkle-500">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1 text-sm text-ink/55">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      {/* CTA */}
      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="rounded-3xl border border-ink/10 bg-white/60 p-10 text-center sm:p-14">
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tightest sm:text-5xl">
                Ready to look like the{" "}
                <span className="font-display font-light italic text-ink/80">best in your field?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink/55">
                Founding-client pricing is open for the first 3 projects. Start now, or send a free
                custom request — no payment until you approve.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/start" className="btn-primary">
                  Start a project
                </Link>
                <Link
                  href="/start?plan=custom"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/40"
                >
                  Get a free quote
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
