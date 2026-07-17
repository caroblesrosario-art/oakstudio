import type { MetadataRoute } from "next";

const SITE = "https://oakstudio.cloud";

// Only public, indexable pages. /admin is private; client dashboards live
// behind a code and have nothing to offer search.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/start/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
