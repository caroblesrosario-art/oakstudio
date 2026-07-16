"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import Asterisk from "./Asterisk";
import { useState } from "react";

const EMAIL = "oakstudio.do@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 pb-28 pt-8">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-ink px-8 py-16 text-center text-white sm:px-16 sm:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(184,201,255,1) 0%, rgba(184,201,255,0) 70%)",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-periwinkle-300">
                <Asterisk className="h-3.5 w-3.5" /> Ready when you are
              </span>
              <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tightest sm:text-7xl">
                Let's build
                <br />
                <span className="font-display font-light italic">something that lasts.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-white/60">
                Start your project in minutes — or reach out first. Either way,
                it's the last time you'll wonder what your studio is up to.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/start"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 sm:w-auto"
                >
                  Start a project
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
                <a
                  href={`mailto:${EMAIL}?subject=New%20project%20—%20OakStudio`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
                >
                  Email the studio
                </a>
              </div>

              <button
                onClick={copy}
                className="group mt-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="5.5"
                    y="5.5"
                    width="8"
                    height="8"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M10.5 5.5V4a2 2 0 00-2-2H4a2 2 0 00-2 2v4.5a2 2 0 002 2h1.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
                {copied ? "Copied!" : EMAIL}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
