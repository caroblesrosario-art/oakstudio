// When deploying to GitHub Pages under https://<user>.github.io/<repo>/,
// the site lives in a subfolder, so assets/links need a base path.
// The GitHub Actions workflow sets GITHUB_PAGES=true (+ optional REPO_NAME).
// Local dev/build stays at the root ("/") so nothing changes on your machine.
const repo = process.env.REPO_NAME || "oakstudio";
const onPages = process.env.GITHUB_PAGES === "true";
// With a custom domain (oakstudio.cloud) the site is served at the ROOT,
// so there's no /<repo> subpath — drop the basePath in that case.
const customDomain = process.env.CUSTOM_DOMAIN || "";
const base = onPages && !customDomain ? `/${repo}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static export — outputs an `out/` folder of plain HTML/CSS/JS
  // that runs on any static host (GitHub Pages, Hostinger public_html, etc.).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: base,
  assetPrefix: base ? `${base}/` : "",
  // Exposed to the browser so we can prefix public/ assets (logos, favicon)
  // that next/image does NOT auto-prefix when `unoptimized` is set.
  env: { NEXT_PUBLIC_BASE_PATH: base },
};

export default nextConfig;
