import Image from "next/image";
import Link from "next/link";
import { asset } from "../lib/asset";

export default function Logo({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "mark";
  className?: string;
}) {
  const src = asset(variant === "mark" ? "/oak-mark.svg" : "/oak-logo.svg");
  const w = variant === "mark" ? 34 : 150;
  const h = variant === "mark" ? 32 : 57;
  return (
    <Link href="/" aria-label="OakStudio — home" className={`inline-flex items-center ${className}`}>
      <Image src={src} alt="OakStudio" width={w} height={h} priority />
    </Link>
  );
}
