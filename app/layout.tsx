import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

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
  process.env.GITHUB_PAGES === "true" ? `/${process.env.REPO_NAME || "oakstudio"}` : "";

export const metadata: Metadata = {
  metadataBase: new URL("https://oakstudio.do"),
  title: "OakStudio — Web, App & Brand design studio",
  description:
    "A design & coding studio for websites, apps, CRMs and ads. Pick a plan, pay 50% to start, and track your whole project from a private dashboard — with a single code. Less back-and-forth, more shipping.",
  icons: {
    icon: `${basePath}/oak-mark.svg`,
  },
  openGraph: {
    title: "OakStudio — Web, App & Brand design studio",
    description:
      "Plans, not proposals. Pay 50% to start, track everything from your dashboard, settle the rest on launch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="grain font-sans antialiased">{children}</body>
    </html>
  );
}
