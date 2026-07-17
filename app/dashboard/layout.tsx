import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your project dashboard",
  description: "Track your project with your OakStudio code.",
  // Private client workspace — nothing here belongs in search results.
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
