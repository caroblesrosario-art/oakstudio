"use client";

import Link from "next/link";
import Image from "next/image";
import Asterisk from "./Asterisk";
import { asset } from "../lib/asset";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      {/* Ambient periwinkle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[720px] rounded-full opacity-60 blur-[130px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(184,201,255,0.5) 0%, rgba(184,201,255,0) 70%)",
        }}
      />

      <div className="container-x relative">
        {/* eyebrow */}
        <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-ink/50">
          <Asterisk spin className="h-3.5 w-3.5 text-periwinkle-500" />
          Design &amp; code studio
          <span className="hidden h-px flex-1 bg-ink/10 sm:block" />
          <span className="hidden sm:block">Est. 2026 · Remote</span>
        </div>

        {/* editorial split */}
        <div className="mt-8 grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="text-[15vw] font-semibold leading-[0.9] tracking-tightest text-ink sm:text-[11vw] lg:text-[8.4rem]">
              Design
              <span className="text-periwinkle-500">&amp;</span>code
              <span className="block">
                like a{" "}
                <span className="relative font-display font-light italic">
                  product
                  <Asterisk className="absolute -right-8 -top-2 h-6 w-6 text-periwinkle-500 sm:-right-10 sm:h-8 sm:w-8" />
                </span>
              </span>
            </h1>
          </div>

          {/* editorial image stack */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="flex justify-end gap-3">
              <ImageCard tone="ink" label="Web" className="mt-8 h-56 w-36" />
              <ImageCard tone="peri" label="Apps" className="h-64 w-40" />
            </div>
          </div>
        </div>

        {/* subhead + CTAs */}
        <div className="mt-10 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-12 sm:items-center">
          <p className="text-pretty text-lg leading-relaxed text-ink/60 sm:col-span-7">
            OakStudio designs and builds websites, apps, CRMs and ad creative —
            then hands you a private dashboard to watch it come to life. Pick a
            plan, pay 50% to start, settle the rest on launch.{" "}
            <span className="text-ink">No endless calls.</span>
          </p>
          <div className="flex flex-col gap-3 sm:col-span-5 sm:flex-row sm:justify-end">
            <Link href="/start" className="btn-primary">
              Start a project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/dashboard" className="btn-ghost">
              Track a project
            </Link>
          </div>
        </div>

        {/* Floating dashboard preview */}
        <div className="relative mx-auto mt-14 max-w-4xl sm:mt-20">
          <div className="overflow-hidden rounded-[28px] border border-ink/8 bg-cream shadow-[0_50px_120px_-45px_rgba(20,18,16,0.4)]">
            <div className="flex items-center gap-2 border-b border-ink/6 px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
              <div className="ml-3 flex items-center gap-2 rounded-full bg-paper px-3 py-1 text-[11px] text-ink/40">
                <Image src={asset("/oak-mark.svg")} alt="" width={12} height={12} />
                oakstudio.do/dashboard · OAK-2049
              </div>
            </div>
            <DashboardPreview />
          </div>

          <div className="absolute -right-3 -top-4 hidden animate-float rounded-2xl border border-ink/8 bg-cream px-4 py-3 shadow-xl sm:block">
            <p className="text-[10px] uppercase tracking-widest text-ink/40">Now</p>
            <p className="text-sm font-medium">Build · 62%</p>
          </div>
        </div>
      </div>

      {/* Oversized wordmark band */}
      <div className="relative mt-16 overflow-hidden border-y border-ink/10 py-6 sm:mt-24">
        <div className="flex">
          <div className="flex shrink-0 animate-marquee items-center gap-6 pr-6">
            {Array.from({ length: 2 }).map((_, r) => (
              <span key={r} className="flex items-center gap-6">
                {["Websites", "Mobile apps", "CRMs", "Ad creative", "Branding"].map((w) => (
                  <span key={w} className="flex items-center gap-6">
                    <span className="whitespace-nowrap font-display text-4xl font-light italic text-ink/80 sm:text-5xl">
                      {w}
                    </span>
                    <Asterisk className="h-5 w-5 shrink-0 text-periwinkle-500" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageCard({
  tone,
  label,
  className = "",
}: {
  tone: "ink" | "peri";
  label: string;
  className?: string;
}) {
  const bg =
    tone === "ink"
      ? "linear-gradient(150deg,#2A2622 0%,#141210 100%)"
      : "linear-gradient(150deg,#D2DEFF 0%,#93A9F5 100%)";
  const text = tone === "ink" ? "text-white/80" : "text-ink/70";
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border border-ink/8 shadow-[0_30px_60px_-30px_rgba(20,18,16,0.4)] ${className}`}
      style={{ background: bg }}
    >
      <div className="grain-mini absolute inset-0 opacity-30" />
      <span className={`absolute bottom-3 left-3 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider backdrop-blur ${text}`}>
        {label}
      </span>
    </div>
  );
}

function DashboardPreview() {
  const stages = [
    { label: "Brief", done: true },
    { label: "Design", done: true },
    { label: "Build", active: true },
    { label: "Review", done: false },
    { label: "Launch", done: false },
  ];
  return (
    <div className="grid gap-5 p-5 sm:grid-cols-3 sm:p-7">
      <div className="sm:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-ink/40">Project</p>
            <p className="text-base font-medium">Terra Botanica — Website</p>
          </div>
          <span className="rounded-full bg-periwinkle-100 px-3 py-1 text-xs font-medium text-periwinkle-500">
            On track
          </span>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-ink/50">
            <span>Progress</span>
            <span className="font-medium text-ink">62%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/6">
            <div className="h-full rounded-full bg-gradient-to-r from-periwinkle-400 to-periwinkle-500" style={{ width: "62%" }} />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-1">
          {stages.map((s, i) => (
            <div key={s.label} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] ${
                  s.done
                    ? "bg-ink text-white"
                    : s.active
                    ? "bg-periwinkle-300 text-ink ring-4 ring-periwinkle-100"
                    : "bg-ink/6 text-ink/40"
                }`}
              >
                {s.done ? "✓" : i + 1}
              </div>
              <span className={`text-[10px] ${s.active ? "font-medium text-ink" : "text-ink/40"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-paper p-4">
        <p className="text-xs text-ink/40">Payments</p>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink/70">Deposit 50%</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">Paid</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink/70">Balance 50%</span>
            <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-ink/50">On launch</span>
          </div>
          <div className="border-t border-ink/6 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink/40">Total</span>
              <span className="text-sm font-semibold">$4,800</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
