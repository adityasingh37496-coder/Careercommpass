import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { STEPS } from "@/data/landing";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-y bg-card py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From &quot;what now?&quot; to a clear plan in three steps"
        />
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              {i < STEPS.length - 1 && (
                <div
                  className="absolute left-14 top-6 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-primary/40 to-transparent md:block"
                  aria-hidden
                />
              )}
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient font-display text-lg font-semibold text-primary-foreground shadow-glow">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
