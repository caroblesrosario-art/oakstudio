import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start your project",
  description:
    "Pick a plan, shape your brief in a few taps, pay 50% and get your tracking code — in minutes, with no meetings. Or send a custom request and we'll quote it.",
  alternates: { canonical: "/start/" },
  openGraph: {
    title: "Start your project · OakStudio",
    description:
      "Pick a plan, shape your brief, pay 50% to start. No meetings, no proposals — just a code to track everything.",
    url: "https://oakstudio.cloud/start/",
  },
};

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
