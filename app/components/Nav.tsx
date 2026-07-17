"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "How it works" },
  { href: "/#pricing", label: "Plans" },
  { href: "/#about", label: "Studio" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-x">
        <div
          className={`flex items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "border border-ink/8 bg-white/75 py-2 shadow-[0_8px_30px_-12px_rgba(11,11,12,0.15)] backdrop-blur-xl"
              : "border border-transparent py-2.5"
          }`}
        >
          <Logo className="shrink-0" />

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/dashboard"
              className="rounded-full px-4 py-2 text-sm text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              Track project
            </Link>
            <Link href="/start" className="btn-primary !py-2.5">
              Start a project
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 md:hidden"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile sheet */}
        {open && (
          <div className="mt-2 rounded-3xl border border-ink/8 bg-white/90 p-3 shadow-lg backdrop-blur-xl md:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm text-ink/80 hover:bg-ink/5"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-ink/8 pt-3">
              <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-ghost">
                Track project
              </Link>
              <Link href="/start" onClick={() => setOpen(false)} className="btn-primary">
                Start a project
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
