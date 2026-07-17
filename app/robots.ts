import type { MetadataRoute } from "next";

const SITE = "https://oakstudio.cloud";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Studio-only panel and private client dashboards.
        disallow: ["/admin/", "/dashboard/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
