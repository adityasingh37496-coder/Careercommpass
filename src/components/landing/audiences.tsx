import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AUDIENCES } from "@/data/landing";

export function Audiences() {
  return (
    <section id="who-its-for" className="scroll-mt-20 border-y bg-card py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Who it's for"
          title="Wherever you are in your journey"
          description="Different stages need different guidance. CareerCompass AI adapts to yours."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map(({ icon: Icon, title, tagline, points }) => (
            <Card key={title} interactive className="bg-background">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground shadow-glow">
                <Icon className="h-5 w-5" />
              </span>
              <CardTitle className="mt-4">{title}</CardTitle>
              <CardDescription>{tagline}</CardDescription>
              <ul className="mt-5 space-y-2.5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
