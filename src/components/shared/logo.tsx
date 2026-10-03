import Link from "next/link";
import { Compass } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground shadow-glow">
        <Compass className="h-5 w-5" />
      </span>
      <span aria-hidden>
        CareerCompass <span className="text-gradient">AI</span>
      </span>
      <span className="sr-only">{BRAND.name}</span>
    </Link>
  );
}
