export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  service: string;
  best?: boolean;
  timeline: string;
  features: string[];
}

export const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    tagline: "A sharp one-page presence, live fast.",
    price: 1600,
    service: "One-page Website",
    timeline: "~2 weeks",
    features: [
      "1-page premium website",
      "Custom design (no templates)",
      "Mobile + responsive",
      "Copywriting included",
      "Contact form + analytics",
      "1 round of revisions",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    tagline: "A full site or app, built to grow with you.",
    price: 4800,
    service: "Website / App Design & Build",
    best: true,
    timeline: "~4 weeks",
    features: [
      "Up to 6 pages or core app flows",
      "Design system + brand kit",
      "CMS or app backend wiring",
      "SEO + performance pass",
      "Live staging + dashboard",
      "2 rounds of revisions",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    tagline: "Product, CRM & campaigns — the full engine.",
    price: 9600,
    service: "Product / CRM + Ads",
    timeline: "~8 weeks",
    features: [
      "Custom CRM or web app",
      "Full brand identity",
      "Ad creative kit (3 campaigns)",
      "Automations + integrations",
      "Priority async support",
      "Unlimited revisions in scope",
    ],
  },
];

// A custom, quote-based request — for people with exact needs that don't fit
// the fixed plans, or who aren't sure yet. No upfront price; we scope + quote.
export const customPlan: Plan = {
  id: "custom",
  name: "Custom",
  tagline: "Something specific in mind — or not sure yet? We'll scope it with you.",
  price: 0,
  service: "Custom project",
  timeline: "Quote in ~2 days",
  features: [
    "Anything not covered by the plans",
    "Tell us what you need (or what you're unsure about)",
    "We review and send a custom quote",
    "No payment until you approve the scope",
  ],
};

export function planById(id: string): Plan | undefined {
  if (id === "custom") return customPlan;
  return plans.find((p) => p.id === id);
}

export function isCustom(id: string): boolean {
  return id === "custom";
}

export function fmt(n: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}
