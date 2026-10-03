"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Check, ClipboardCheck, RotateCcw, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ChoiceOption } from "@/components/ui/choice-option";
import { ProgressBar } from "@/components/ui/progress-bar";
import { LEVEL_LABEL, LEVEL_TONE, scoreTest } from "@/lib/skill-scoring";
import type { SkillTest, SkillTestId, SkillTestResult, SkillTestResults } from "@/types/skill-test";

type Phase = "intro" | "questions" | "result";

const LETTERS = ["A", "B", "C", "D", "E"];

interface SkillTestViewProps {
  test: SkillTest;
  allTests: SkillTest[];
  results: SkillTestResults;
  onComplete: (result: SkillTestResult) => void;
  onSelectTest: (id: SkillTestId) => void;
  onBack: () => void;
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-xl border bg-muted px-4 py-3 font-mono text-sm leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

export function SkillTestView({
  test,
  allTests,
  results,
  onComplete,
  onSelectTest,
  onBack,
}: SkillTestViewProps) {
  const previous = results[test.id];
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => test.questions.map(() => null));
  const [result, setResult] = useState<SkillTestResult | null>(null);
  const [showError, setShowError] = useState(false);
  const questionRef = useRef<HTMLFieldSetElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  // Keep keyboard and screen-reader users oriented as the question or phase changes.
  useEffect(() => {
    if (phase === "questions") questionRef.current?.focus({ preventScroll: true });
    if (phase === "result") resultRef.current?.focus({ preventScroll: true });
  }, [phase, index]);

  const total = test.questions.length;
  const answeredCount = answers.filter((a) => a !== null).length;

  function start() {
    setAnswers(test.questions.map(() => null));
    setIndex(0);
    setResult(null);
    setShowError(false);
    setPhase("questions");
  }

  function next() {
    if (answers[index] === null) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (index < total - 1) {
      setIndex(index + 1);
      return;
    }
    const scored = scoreTest(test, answers);
    setResult(scored);
    onComplete(scored);
    setPhase("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previousQuestion() {
    setShowError(false);
    setIndex(Math.max(0, index - 1));
  }

  if (phase === "intro") {
    return (
      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <ClipboardCheck className="h-5 w-5" aria-hidden />
          </span>
          <CardTitle>Before you start</CardTitle>
        </div>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {test.instructions.map((line) => (
            <li key={line}>{line}</li>
          ))}
          <li>Your score is worked out in this browser. Nothing is sent anywhere.</li>
        </ul>
        {previous && (
          <p className="mt-5 text-sm text-muted-foreground">
            Last result: {previous.score}/{previous.total} ({LEVEL_LABEL[previous.level]}). Retaking replaces it.
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={start} className="w-full sm:w-auto">
            {previous ? "Retake test" : "Start test"} <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button size="lg" variant="ghost" onClick={onBack} className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to my matches
          </Button>
        </div>
      </Card>
    );
  }

  if (phase === "questions") {
    const question = test.questions[index];
    const isLast = index === total - 1;
    return (
      <div className="space-y-6">
        <ProgressBar
          value={Math.round((answeredCount / total) * 100)}
          label={`Question ${index + 1} of ${total}`}
          showValue={false}
        />
        <Card className="p-6 sm:p-8">
          <fieldset ref={questionRef} tabIndex={-1} className="min-w-0 outline-none" aria-describedby={showError ? "q-error" : undefined}>
            <legend className="font-display text-lg font-semibold">{question.prompt}</legend>
            {question.code && <CodeBlock code={question.code} />}
            <div className="mt-5 space-y-3">
              {question.options.map((option, i) => (
                <ChoiceOption
                  key={`${question.id}-${i}`}
                  name={question.id}
                  value={i}
                  letter={LETTERS[i]}
                  label={option}
                  checked={answers[index] === i}
                  onChange={() => {
                    setShowError(false);
                    setAnswers((prev) => prev.map((a, n) => (n === index ? i : a)));
                  }}
                />
              ))}
            </div>
            {showError && (
              <p id="q-error" role="alert" className="mt-4 flex items-center gap-1.5 text-sm text-danger">
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                Choose an answer to continue.
              </p>
            )}
          </fieldset>
        </Card>
        <div className="flex items-center justify-between gap-3">
          <Button variant="outline" onClick={previousQuestion} disabled={index === 0}>
            <ArrowLeft className="h-4 w-4" aria-hidden /> Previous
          </Button>
          <Button onClick={next}>
            {isLast ? "See my score" : "Next"} <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    );
  }

  // phase === "result"
  const final = result!;
  const others = allTests.filter((t) => t.id !== test.id);
  return (
    <div className="space-y-6">
      <Card className="border-primary/40 p-6 shadow-glow sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2
              ref={resultRef}
              tabIndex={-1}
              className="font-display text-xl font-semibold outline-none"
            >
              Your {test.title} score
            </h2>
            <p className="mt-2 font-display text-4xl font-semibold">
              {final.score}
              <span className="text-xl text-muted-foreground"> / {final.total}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Badge tone={LEVEL_TONE[final.level]}>{LEVEL_LABEL[final.level]}</Badge>
            <Badge tone="neutral">Sample test</Badge>
          </div>
        </div>
        <ProgressBar value={final.percent} label="Score" className="mt-6" />
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{test.summaries[final.level]}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          This short sample test is a rough guide, not a certification. Your career matches now use this result.
        </p>
      </Card>

      <Card className="p-6 sm:p-8">
        <CardTitle>Review your answers</CardTitle>
        <ol className="mt-5 space-y-6">
          {test.questions.map((q, i) => {
            const chosen = final.answers[i];
            const correct = chosen === q.correctIndex;
            return (
              <li key={q.id} className="text-sm">
                <p className="flex items-start gap-2 font-medium">
                  <span
                    className={
                      correct
                        ? "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success"
                        : "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger"
                    }
                  >
                    {correct ? (
                      <Check className="h-3 w-3" aria-label="Correct" />
                    ) : (
                      <X className="h-3 w-3" aria-label="Incorrect" />
                    )}
                  </span>
                  <span>
                    {i + 1}. {q.prompt}
                  </span>
                </p>
                {q.code && <CodeBlock code={q.code} />}
                {!correct && (
                  <p className="mt-2 pl-7 text-muted-foreground">
                    Your answer: {chosen !== null ? q.options[chosen] : "No answer"}
                  </p>
                )}
                <p className="mt-1 pl-7 text-muted-foreground">
                  Correct answer: <span className="font-medium text-foreground">{q.options[q.correctIndex]}</span>
                </p>
                <p className="mt-1 pl-7 text-muted-foreground">{q.explanation}</p>
              </li>
            );
          })}
        </ol>
      </Card>

      <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
        <Button size="lg" onClick={onBack} className="w-full sm:w-auto">
          See updated matches <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button size="lg" variant="outline" onClick={start} className="w-full sm:w-auto">
          <RotateCcw className="h-4 w-4" aria-hidden /> Retake
        </Button>
      </div>
      {others.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Try another:</span>
          {others.map((t) => (
            <Button key={t.id} size="sm" variant="ghost" onClick={() => onSelectTest(t.id)}>
              {t.title}
              {results[t.id] ? ` (${LEVEL_LABEL[results[t.id]!.level]})` : ""}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
