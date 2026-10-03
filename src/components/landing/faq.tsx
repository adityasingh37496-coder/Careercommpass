import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FAQS } from "@/data/landing";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-20">
      <Container className="max-w-3xl">
        <SectionHeading align="center" eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10 space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.question}
              className="group rounded-2xl border bg-card px-5 py-4 shadow-soft open:border-primary/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
