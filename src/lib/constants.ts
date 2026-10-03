export const BRAND = {
  name: "CareerCompass AI",
  tagline: "Turn your skills into your career direction.",
  description:
    "A frontend career discovery demo with sample skill checks, locally scored career matches, and practical next steps for students and fresh graduates.",
} as const;

export interface NavLink {
  label: string;
  href: string;
}

/** Landing-page sections for now; swap in real routes as pages get built. */
export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Who it's for", href: "/#who-its-for" },
  { label: "FAQ", href: "/#faq" },
];
