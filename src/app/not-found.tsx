import Link from "next/link";
import { Compass } from "lucide-react";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <section className="bg-hero-glow py-16 sm:py-24">
      <Container className="max-w-xl">
        <Card className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <Compass className="h-6 w-6" aria-hidden />
          </span>
          <p className="mt-5 text-sm font-semibold text-primary">404 · Page not found</p>
          <CardTitle className="mt-2 text-2xl">Let’s get you back on track</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">That page isn’t part of this prototype.</p>
          <Link href="/" className={buttonVariants({ className: "mt-6" })}>Go to CareerCompass AI</Link>
        </Card>
      </Container>
    </section>
  );
}
