import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { SAMPLE_GAPS } from "@/data/landing";

const BENEFITS = [
  "See where you stand today against a target role",
  "Know which gaps matter most, not just which exist",
  "Turn every gap into a concrete next action",
];

export function SampleReport() {
  return (
    <section className="py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Sample skill gap analysis"
            title="Know exactly what to learn next"
            description="Vague advice like “improve your skills” doesn't help. This sample shows how the prototype highlights gaps for one example role."
          />
          <ul className="mt-6 space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-muted-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <CardTitle>Data Analyst · skill readiness</CardTitle>
            <Badge tone="neutral">Sample</Badge>
          </div>
          <div className="mt-6 space-y-6">
            {SAMPLE_GAPS.map((g) => (
              <div key={g.skill}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{g.skill}</span>
                  <span className="text-muted-foreground">
                    {g.current}% <span className="text-xs">of {g.needed}% needed</span>
                  </span>
                </div>
                <div className="relative h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-brand-gradient"
                    style={{ width: `${g.current}%` }}
                  />
                  <div
                    className="absolute -top-1 h-4 w-0.5 rounded bg-foreground/60"
                    style={{ left: `${g.needed}%` }}
                    aria-hidden
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            The marker shows the level typically expected for the role.
          </p>
        </Card>
      </Container>
    </section>
  );
}
