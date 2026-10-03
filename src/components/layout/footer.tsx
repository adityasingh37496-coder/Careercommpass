import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/shared/logo";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-card">
      <Container className="py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-xs space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground">{BRAND.tagline}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {BRAND.name}. Hackathon prototype.
        </div>
      </Container>
    </footer>
  );
}
