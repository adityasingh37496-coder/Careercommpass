"use client";

import { useEffect, useRef, useState } from "react";
import { AssessmentForm } from "@/components/assessment/assessment-form";
import { ResultsView } from "@/components/assessment/results-view";
import { Stepper } from "@/components/assessment/stepper";
import { SkillTestView } from "@/components/skill-test/skill-test-view";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { SKILL_TESTS, getSkillTest } from "@/data/skill-tests";
import { createDemoProfile, createDemoSkillResults } from "@/data/demo";
import { cn } from "@/lib/utils";
import type { AssessmentProfile } from "@/types/assessment";
import type { SkillTestId, SkillTestResults } from "@/types/skill-test";

type Step = "form" | "results" | "test";

const INITIAL_PROFILE: AssessmentProfile = { stage: null, skills: [], interests: [], notes: "" };

const COPY = {
  form: {
    eyebrow: "Career discovery",
    title: "Tell us about you",
    description:
      "Answer a few quick questions and we'll show you career directions that fit. It takes about a minute.",
  },
  results: {
    eyebrow: "Demo results",
    title: "Your career matches",
    description: "Based on your skills, interests and any sample skill checks you take.",
  },
} as const;

export function AssessmentFlow() {
  const [profile, setProfile] = useState<AssessmentProfile>(INITIAL_PROFILE);
  const [step, setStep] = useState<Step>("form");
  const [skillResults, setSkillResults] = useState<SkillTestResults>({});
  const [isSampleDemo, setIsSampleDemo] = useState(false);
  const [activeTestId, setActiveTestId] = useState<SkillTestId>("python");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  // Move to the top and focus the heading whenever the step changes (not on first load).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, activeTestId]);

  const activeTest = getSkillTest(activeTestId);
  const copy =
    step === "test" && activeTest
      ? {
          eyebrow: "Sample skill check",
          title: `${activeTest.title} skill check`,
          description: activeTest.tagline,
        }
      : COPY[step === "form" ? "form" : "results"];

  return (
    <section className="bg-hero-glow relative min-h-[calc(100vh-4rem)]">
      <Container className={cn("py-10 sm:py-14", step === "results" ? "max-w-4xl" : "max-w-3xl")}>
        <div className="mb-8">
          <Stepper current={step === "form" ? 0 : 1} />
        </div>

        <header className="mb-8 text-center">
          <Badge className="mb-4">{copy.eyebrow}</Badge>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-3xl font-semibold tracking-tight outline-none sm:text-4xl"
          >
            {copy.title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{copy.description}</p>
        </header>

        {step === "form" ? (
          <AssessmentForm
            profile={profile}
            onChange={(nextProfile) => {
              setProfile(nextProfile);
              if (isSampleDemo) {
                setSkillResults({});
                setIsSampleDemo(false);
              }
            }}
            onSubmit={() => setStep("results")}
            onUseDemo={() => {
              setProfile(createDemoProfile());
              setSkillResults(createDemoSkillResults());
              setIsSampleDemo(true);
              setStep("results");
            }}
          />
        ) : step === "test" && activeTest ? (
          <SkillTestView
            key={activeTest.id}
            test={activeTest}
            allTests={SKILL_TESTS}
            results={skillResults}
            onComplete={(result) => setSkillResults((prev) => ({ ...prev, [result.testId]: result }))}
            onSelectTest={setActiveTestId}
            onBack={() => setStep("results")}
          />
        ) : (
          <ResultsView
            profile={profile}
            skillResults={skillResults}
            isSampleDemo={isSampleDemo}
            onTakeTest={(id) => {
              setActiveTestId(id);
              setStep("test");
            }}
            onEdit={() => setStep("form")}
            onReset={() => {
              setProfile(INITIAL_PROFILE);
              setSkillResults({});
              setIsSampleDemo(false);
              setStep("form");
            }}
          />
        )}
      </Container>
    </section>
  );
}
