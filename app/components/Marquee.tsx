const items = [
  "Websites",
  "Mobile apps",
  "CRMs",
  "Ad creative",
  "Branding",
  "Landing pages",
  "E-commerce",
  "Design systems",
  "Dashboards",
];

export default function Marquee() {
  return (
    <div className="relative border-y border-ink/8 bg-white/40 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...items, ...items].map((it, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="text-sm font-medium uppercase tracking-[0.18em] text-ink/45">
                {it}
              </span>
              <span className="text-periwinkle-400">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
