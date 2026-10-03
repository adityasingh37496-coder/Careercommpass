import { Audiences } from "@/components/landing/audiences";
import { CtaBanner } from "@/components/landing/cta-banner";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SampleReport } from "@/components/landing/sample-report";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <SampleReport />
      <Audiences />
      <Faq />
      <CtaBanner />
    </>
  );
}
