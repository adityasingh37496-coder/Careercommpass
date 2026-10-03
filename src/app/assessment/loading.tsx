import { LoaderCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";

export default function AssessmentLoading() {
  return (
    <section className="bg-hero-glow min-h-[calc(100vh-4rem)] py-10 sm:py-14" aria-live="polite">
      <Container className="max-w-3xl">
        <div className="flex flex-col items-center py-10 text-center">
          <LoaderCircle className="h-8 w-8 animate-spin text-primary" aria-hidden />
          <p className="mt-4 font-display text-lg font-semibold">Preparing your career demo…</p>
          <p className="mt-1 text-sm text-muted-foreground">This can take a moment the first time.</p>
        </div>
        <div className="space-y-4" aria-hidden>
          <Card className="h-24 animate-pulse bg-card/70" />
          <Card className="h-40 animate-pulse bg-card/70" />
          <Card className="h-40 animate-pulse bg-card/70" />
        </div>
      </Container>
    </section>
  );
}
