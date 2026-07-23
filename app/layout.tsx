import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { plans } from "./lib/plans";
import Analytics from "./components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const basePath =
  process.env.GITHUB_PAGES === "true" && !process.env.CUSTOM_DOMAIN
    ? `/${process.env.REPO_NAME || "oakstudio"}`
    : "";

const SITE = "https://oakstudio.cloud";
const TITLE = "OakStudio — Web, App & Brand design studio";
const DESCRIPTION =
  "A design & coding studio for websites, apps, CRMs and ads. Pick a plan, pay 50% to start, and track your whole project from a private dashboard — with a single code. No meetings, no proposals.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s · OakStudio",
  },
  description: DESCRIPTION,
  applicationName: "OakStudio",
  keywords: [
    "design studio",
    "web design",
    "app design",
    "brand identity",
    "website development",
    "productized design service",
    "fixed price web design",
    "no meetings design studio",
    "CRM setup",
    "ad creative",
  ],
  authors: [{ name: "OakStudio" }],
  creator: "OakStudio",
  publisher: "OakStudio",
  alternates: { canonical: "/" },
  icons: {
    icon: `${basePath}/oak-mark.svg`,
    apple: `${basePath}/oak-mark.svg`,
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "OakStudio",
    locale: "en_US",
    title: TITLE,
    description:
      "Plans, not proposals. Pay 50% to start, track everything from your dashboard, settle the rest on launch.",
    // A real .png (baked by scripts/og-image.tsx) — a static host must send
    // image/png, which it only does off the extension.
    images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Plans, not proposals. Pay 50% to start, track everything from your dashboard, settle the rest on launch.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "design",
};

// Structured data — tells search engines this is a design studio with
// concrete, priced offers (built from the real plans, so it can't drift).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE}/#studio`,
  name: "OakStudio",
  url: SITE,
  description: DESCRIPTION,
  slogan: "Plans, not proposals.",
  image: `${SITE}/og.png`,
  logo: `${SITE}/oak-mark.svg`,
  priceRange: "$1,600 – $9,600",
  areaServed: { "@type": "Place", name: "Worldwide" },
  availableLanguage: ["en", "es"],
  serviceType: ["Web design", "App design", "Brand identity", "CRM setup", "Ad creative"],
  makesOffer: plans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.tagline,
    price: p.price,
    priceCurrency: "USD",
    category: p.service,
    url: `${SITE}/start/?plan=${p.id}`,
    availability: "https://schema.org/InStock",
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="grain font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
