import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio admin",
  // Studio-only panel — keep it out of search entirely.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
