"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Info, Lightbulb, Pencil, RotateCcw, Sparkles } from "lucide-react";
import { FIT_LABEL, FIT_TONE, MatchCard } from "@/components/assessment/match-card";
import { DashboardView } from "@/components/assessment/dashboard-view";
import { GuidanceView } from "@/components/assessment/guidance-view";
import { SkillCheckCard } from "@/components/assessment/skill-check-card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { STAGE_OPTIONS } from "@/data/assessment";
import {
  COVERED_CREDIT,
  INTEREST_POINTS,
  MAX_SCORE,
  RESULT_COUNT,
  SELF_REPORTED_CREDIT,
  SKILL_POINTS,
  getCareerMatches,
} from "@/lib/matching";
import { getSkillScores } from "@/lib/skill-scoring";
import type { AssessmentProfile } from "@/types/assessment";
import type { SkillTestId, SkillTestResults } from "@/types/skill-test";

interface ResultsViewProps {
  profile: AssessmentProfile;
  skillResults: SkillTestResults;
  isSampleDemo: boolean;
  onTakeTest: (id: SkillTestId) => void;
  onEdit: () => void;
  onReset: () => void;
}

export function ResultsView({ profile, skillResults, isSampleDemo, onTakeTest, onEdit, onReset }: ResultsViewProps) {
  const [activeView, setActiveView] = useState<"matches" | "guidance" | "dashboard">("matches");
  const allMatches = useMemo(
    () => getCareerMatches({ ...profile, skillScores: getSkillScores(skillResults) }, RESULT_COUNT * 2),
    [profile, skillResults]
  );
  const matches = allMatches.slice(0, RESULT_COUNT);
  const alsoWorthALook = allMatches.slice(RESULT_COUNT);
  const topScore = matches[0]?.score ?? 0;
  const stage = STAGE_OPTIONS.find((s) => s.value === profile.stage);
  const notes = profile.notes.trim();

  if (activeView === "guidance" && matches[0]) {
    return (
      <GuidanceView
        match={matches[0]}
        stage={profile.stage}
        onBack={() => setActiveView("matches")}
      />
    );
  }

  if (activeView === "dashboard") {
    return (
      <DashboardView
        profile={profile}
        skillResults={skillResults}
        matches={allMatches}
        onBack={() => setActiveView("matches")}
        onOpenGuidance={() => setActiveView("guidance")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div role="note" className="flex gap-3 rounded-2xl border border-primary/20 bg-primary-soft p-4 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
        <p className="text-muted-foreground">
          <strong className="font-semibold text-foreground">Demo recommendations.</strong> These matches
          come from a transparent scoring rule that compares your selected skills, interests and any
          sample skill checks with a set of sample careers. They are not real AI predictions or professional career advice.
          {isSampleDemo && " A sample profile and sample skill scores are loaded for a quick walkthrough; edit your answers or start over to replace them."}
        </p>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Your answers</CardTitle>
            {stage && <p className="mt-1 text-sm text-muted-foreground">{stage.label}</p>}
          </div>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="h-3.5 w-3.5" aria-hidden /> Edit answers
          </Button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Skills</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <Badge key={s} tone="neutral">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Interests</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.interests.map((i) => (
                <Badge key={i} tone="neutral">
                  {i}
                </Badge>
              ))}
            </div>
          </div>
          {notes && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Your notes <span className="normal-case">(not used in match scores)</span>
              </p>
              <p className="mt-2 whitespace-pre-line break-words text-sm text-muted-foreground">{notes}</p>
            </div>
          )}
        </div>
      </Card>

      {matches[0] && (
        <Card className="flex flex-col gap-5 border-primary/20 bg-gradient-to-br from-primary-soft/70 to-accent-soft/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-soft">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <CardTitle className="text-base">Want a clear next step for {matches[0].career.title}?</CardTitle>
              <p className="mt-1.5 text-sm text-muted-foreground">
                See why it fits, which skills to focus on, and a sample project roadmap.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start sm:self-auto">
            <Button onClick={() => setActiveView("guidance")}>
              View my guidance <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button variant="outline" onClick={() => setActiveView("dashboard")}>
              <BarChart3 className="h-4 w-4" aria-hidden /> Dashboard
            </Button>
          </div>
        </Card>
      )}

      <SkillCheckCard results={skillResults} onTakeTest={onTakeTest} />

      <details className="rounded-2xl border bg-card px-5 py-4 shadow-soft">
        <summary className="cursor-pointer list-none text-sm font-medium [&::-webkit-details-marker]:hidden">
          How matches are scored
        </summary>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
          <li>
            Each role gets up to {SKILL_POINTS} points for skills and {INTEREST_POINTS} for interests, capped at{" "}
            {MAX_SCORE}.
          </li>
          <li>Role skills are weighted: core = 3, important = 2, helpful = 1.</li>
          <li>
            A skill you select but have not tested earns {Math.round(SELF_REPORTED_CREDIT * 100)}% credit. With a
            sample check it earns 30% plus 70% of your test score.
          </li>
          <li>
            A skill you did not select but scored 60% or more on earns partial credit (80% of your test score).
          </li>
          <li>Two matching interests earn full interest points.</li>
          <li>
            Skills to build next are ranked by weight and how much credit is missing. A skill with{" "}
            {Math.round(COVERED_CREDIT * 100)}% credit or more counts as covered. Your stage and notes do not
            change the scores.
          </li>
        </ul>
      </details>

      {topScore < 40 && (
        <div role="note" className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-muted-foreground">
          Your selections only partly overlap with these roles. Try adding more skills or interests, or take a
          sample skill check, to get sharper matches.
        </div>
      )}

      <div className="space-y-6">
        {matches.map((match, i) => (
          <MatchCard key={match.career.id} match={match} rank={i + 1} />
        ))}
      </div>

      {alsoWorthALook.length > 0 && (
        <Card className="p-6 sm:p-8">
          <CardTitle className="text-base">Also worth a look</CardTitle>
          <ul className="mt-4 divide-y">
            {alsoWorthALook.map((m, i) => (
              <li key={m.career.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <span className="text-sm">
                  <span className="mr-2 text-muted-foreground">{RESULT_COUNT + i + 1}.</span>
                  <span className="font-medium">{m.career.title}</span>
                </span>
                <span className="flex items-center gap-3">
                  <Badge tone={FIT_TONE[m.fit]}>{FIT_LABEL[m.fit]}</Badge>
                  <span className="w-12 text-right text-sm text-muted-foreground">{m.score}%</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {stage && (
        <Card className="flex gap-4 p-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Lightbulb className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <CardTitle className="text-base">A tip for your stage</CardTitle>
            <p className="mt-1.5 text-sm text-muted-foreground">{stage.tip}</p>
          </div>
        </Card>
      )}

      <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
        <Button size="lg" onClick={onEdit} className="w-full sm:w-auto">
          <Pencil className="h-4 w-4" aria-hidden /> Edit my answers
        </Button>
        <Button size="lg" variant="outline" onClick={onReset} className="w-full sm:w-auto">
          <RotateCcw className="h-4 w-4" aria-hidden /> Start over
        </Button>
        <Link href="/" className={buttonVariants({ size: "lg", variant: "ghost", className: "w-full sm:w-auto" })}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
