"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { GA_ID } from "../lib/analytics";

// Loads GA4 only when a Measurement ID is set, and never on the private app
// pages — client dashboards carry the project code in the URL, and the studio
// admin is nobody's business but yours. Keeps those out of your analytics.
export default function Analytics() {
  const pathname = usePathname();

  if (!GA_ID) return null;
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
