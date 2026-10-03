import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  INTEREST_POINTS,
  MAX_SCORE,
  SKILL_POINTS,
  WEIGHT_LABEL,
} from "@/lib/matching";
import { LEVEL_LABEL, LEVEL_TONE } from "@/lib/skill-scoring";
import { cn } from "@/lib/utils";
import type { CareerMatch, CreditSource, FitLevel, SkillToBuildKind } from "@/types/assessment";

export const FIT_LABEL: Record<FitLevel, string> = {
  strong: "Strong match",
  good: "Good match",
  exploring: "Worth exploring",
};

export const FIT_TONE = { strong: "success", good: "primary", exploring: "neutral" } as const;

const SOURCE_LABEL: Record<CreditSource, string> = {
  "self-reported": "Selected, not tested",
  "test-backed": "Selected + sample check",
  "test-only": "Sample check only",
  none: "Not in your profile",
};

const BUILD_TONE: Record<SkillToBuildKind, "primary" | "warning" | "accent"> = {
  missing: "primary",
  strengthen: "warning",
  stretch: "accent",
};

const BUILD_PREFIX: Record<SkillToBuildKind, string> = {
  missing: "Learn",
  strengthen: "Strengthen",
  stretch: "Level up",
};

export function MatchCard({ match, rank }: { match: CareerMatch; rank: number }) {
  const {
    career,
    score,
    fit,
    breakdown,
    skillDetails,
    matchedSkills,
    matchedInterests,
    skillsToBuild,
    explanation,
    assessedSkills,
  } = match;
  const hasGaps = skillsToBuild.some((s) => s.kind !== "stretch");

  return (
    <Card className={cn("p-6 sm:p-8", rank === 1 && "border-primary/40 shadow-glow")}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient font-display font-semibold text-primary-foreground">
            {rank}
          </span>
          <CardTitle className="text-xl">{career.title}</CardTitle>
        </div>
        <div className="flex gap-2">
          <Badge tone={FIT_TONE[fit]}>{FIT_LABEL[fit]}</Badge>
          <Badge tone="neutral">Demo</Badge>
        </div>
      </div>

      <ProgressBar value={score} label="Match score" className="mt-6" />

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{explanation}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        You have some credit for {matchedSkills.length} of {skillDetails.length} skills for this role.
      </p>

      {matchedSkills.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Skills that count for you
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {matchedSkills.map((s) => (
              <Badge key={s} tone="success">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {assessedSkills.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Skill check results
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {assessedSkills.map(({ skill, level, percent }) => (
              <Badge key={skill} tone={LEVEL_TONE[level]}>
                {skill}: {LEVEL_LABEL[level]} ({percent}%)
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {hasGaps ? "Skills to build next, most relevant first" : "You cover the core skills. Level up with"}
        </p>
        <ol className="mt-2.5 space-y-2.5">
          {skillsToBuild.map((s) => (
            <li key={s.label} className="flex flex-wrap items-start gap-x-3 gap-y-1">
              <Badge tone={BUILD_TONE[s.kind]}>
                {BUILD_PREFIX[s.kind]}: {s.label}
              </Badge>
              <span className="min-w-0 flex-1 text-xs text-muted-foreground">{s.reason}</span>
            </li>
          ))}
        </ol>
      </div>

      <details className="group mt-6 rounded-xl border px-4 py-3">
        <summary className="cursor-pointer list-none text-sm font-medium [&::-webkit-details-marker]:hidden">
          How this score was calculated
        </summary>
        <div className="mt-3 space-y-3 text-xs text-muted-foreground">
          <p>
            Skills {breakdown.skillPoints}/{SKILL_POINTS} + interests {breakdown.interestPoints}/
            {INTEREST_POINTS} = {breakdown.skillPoints + breakdown.interestPoints}
            {breakdown.skillPoints + breakdown.interestPoints > MAX_SCORE
              ? `, capped at ${MAX_SCORE} so no match looks perfect`
              : ""}
            .
          </p>
          <ul className="space-y-1.5">
            {skillDetails.map((d) => (
              <li key={d.skill} className="flex flex-wrap justify-between gap-x-3">
                <span>
                  <span className="font-medium text-foreground">{d.skill}</span> ({WEIGHT_LABEL[d.weight]},
                  weight {d.weight})
                </span>
                <span>
                  {Math.round(d.credit * 100)}% credit · {SOURCE_LABEL[d.source]}
                  {d.testPercent !== undefined ? ` · check ${d.testPercent}%` : ""}
                </span>
              </li>
            ))}
          </ul>
          <p>
            Interests matched:{" "}
            {matchedInterests.length > 0 ? matchedInterests.join(", ") : "none of this role's interests"}.
          </p>
        </div>
      </details>
    </Card>
  );
}
