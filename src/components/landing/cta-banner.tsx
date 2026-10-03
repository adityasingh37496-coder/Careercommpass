import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section id="get-started" className="scroll-mt-20 pb-4">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 text-center text-primary-foreground shadow-glow sm:px-12 sm:py-16">
          <div
            className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_85%_80%,white,transparent_40%)]"
            aria-hidden
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to find your career direction?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
              Start with what you already know. We&apos;ll help you work out where it can take you.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/assessment"
                className={buttonVariants({
                  size: "lg",
                  className: "bg-white text-primary shadow-none hover:bg-white/90 hover:brightness-100",
                })}
              >
                Find my direction <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
