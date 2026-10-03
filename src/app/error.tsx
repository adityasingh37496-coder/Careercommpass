"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-hero-glow py-16 sm:py-24">
      <Container className="max-w-xl">
        <Card className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/15 text-warning">
            <AlertTriangle className="h-6 w-6" aria-hidden />
          </span>
          <CardTitle className="mt-5 text-2xl">That page hit a snag</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            If you were in the assessment, your answers are only held in this browser tab. Try the page again, or return to the start.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={reset}>
              <RefreshCw className="h-4 w-4" aria-hidden /> Try again
            </Button>
            <Link href="/" className={buttonVariants({ variant: "outline" })}>Back to home</Link>
          </div>
        </Card>
      </Container>
    </section>
  );
}
