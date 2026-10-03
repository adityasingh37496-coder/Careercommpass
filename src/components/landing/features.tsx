import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { FEATURES } from "@/data/landing";

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Features"
          title="Everything you need to choose with confidence"
          description="From first idea to first application, one place to understand your options and act on them."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title} interactive>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <CardTitle className="mt-4">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
