// Prefix for files served from public/ (logos, favicon, etc.).
// On GitHub Pages the site lives under /<repo>/, and next/image does not
// auto-prefix the basePath when `unoptimized` is set — so we do it here.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
