import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Container } from "@/components/layout/container";
import { HeroPreview } from "@/components/landing/hero-preview";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-hero-glow relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <Container className="relative grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-2 lg:gap-10">
        <div className="text-center lg:text-left">
          <Badge className="animate-fade-up">
            <Compass className="h-3.5 w-3.5" /> For students &amp; fresh graduates
          </Badge>
          <h1 className="animate-fade-up mt-6 font-display text-4xl font-semibold tracking-tight [animation-delay:80ms] sm:text-5xl lg:text-6xl">
            Turn your skills into your{" "}
            <span className="text-gradient">career direction.</span>
          </h1>
          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-lg text-muted-foreground [animation-delay:160ms] lg:mx-0">
            Explore sample career matches based on the skills and interests you choose. Try short skill checks, compare paths, and get a starter plan in this frontend demo.
          </p>
          <div className="animate-fade-up mt-8 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/assessment" className={buttonVariants({ size: "lg" })}>
              Find my direction <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#how-it-works" className={buttonVariants({ size: "lg", variant: "outline" })}>
              See how it works
            </Link>
          </div>
          <p className="animate-fade-up mt-5 text-sm text-muted-foreground [animation-delay:320ms]">
            Built for pre-final-year, final-year and recently graduated students · no account needed
          </p>
        </div>

        <div className="animate-fade-up [animation-delay:200ms]">
          <HeroPreview />
        </div>
      </Container>
    </section>
  );
}
