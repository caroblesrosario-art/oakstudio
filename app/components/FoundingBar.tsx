import Link from "next/link";
import Asterisk from "./Asterisk";
import { FOUNDING } from "../lib/offer";

// Slim launch bar. Renders only while the founding offer is active.
export default function FoundingBar() {
  if (!FOUNDING.active) return null;

  const spots =
    FOUNDING.spotsLeft > 0
      ? `${FOUNDING.spotsLeft} of ${FOUNDING.spotsTotal} spots left`
      : "Final spots";

  return (
    <Link
      href="/#pricing"
      className="group relative z-40 flex items-center justify-center gap-2 bg-ink px-4 py-2.5 text-center text-xs text-white/85 transition-colors hover:text-white sm:text-sm"
    >
      <Asterisk className="h-3.5 w-3.5 text-periwinkle-300" />
      <span>
        <span className="font-medium text-white">Founding client offer</span> —{" "}
        {FOUNDING.percentOff}% off the first {FOUNDING.spotsTotal} projects.
      </span>
      <span className="hidden text-white/55 sm:inline">· {spots}</span>
      <span className="font-medium underline underline-offset-2 opacity-80 transition-opacity group-hover:opacity-100">
        See plans →
      </span>
    </Link>
  );
}
