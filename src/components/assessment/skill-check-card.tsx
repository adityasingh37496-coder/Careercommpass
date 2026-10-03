import { ClipboardCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SKILL_TESTS } from "@/data/skill-tests";
import { LEVEL_LABEL, LEVEL_TONE } from "@/lib/skill-scoring";
import type { SkillTestId, SkillTestResults } from "@/types/skill-test";

interface SkillCheckCardProps {
  results: SkillTestResults;
  onTakeTest: (id: SkillTestId) => void;
}

export function SkillCheckCard({ results, onTakeTest }: SkillCheckCardProps) {
  const anyTaken = Object.keys(results).length > 0;
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <ClipboardCheck className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <CardTitle>Check your skills (optional)</CardTitle>
          <CardDescription>
            Take a short 5-question sample test to back up your skills. Results are scored in your
            browser and update the matches below.
          </CardDescription>
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {SKILL_TESTS.map((test) => {
          const result = results[test.id];
          return (
            <li
              key={test.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4"
            >
              <div>
                <p className="font-display font-semibold">{test.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {result ? `Score ${result.score}/${result.total}` : test.tagline}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {result ? (
                  <Badge tone={LEVEL_TONE[result.level]}>{LEVEL_LABEL[result.level]}</Badge>
                ) : (
                  <Badge tone="neutral">Not taken</Badge>
                )}
                <Button
                  size="sm"
                  variant={result ? "outline" : "primary"}
                  onClick={() => onTakeTest(test.id)}
                >
                  {result ? "Retake" : "Take test"}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-xs text-muted-foreground">
        {anyTaken
          ? "Your test percent now feeds the matches: a selected skill earns 30% plus 70% of its score, and a skill you did not select earns partial credit from 60% up."
          : "Skipping is fine. Selected skills earn 85% credit until a test backs them up."}
      </p>
    </Card>
  );
}
