"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, BarChart3, RotateCcw, SlidersHorizontal, Sparkles } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SKILLS } from "@/data/assessment";
import { FIT_LABEL, FIT_TONE } from "@/components/assessment/match-card";
import { getCareerMatches } from "@/lib/matching";
import { getSkillScores, LEVEL_LABEL } from "@/lib/skill-scoring";
import type { AssessmentProfile, CareerMatch } from "@/types/assessment";
import type { Skill } from "@/data/assessment";
import type { SkillTestResults } from "@/types/skill-test";

const CHART_COLORS = ["#4f46e5", "#0891b2", "#0f766e"];

function initialPreviewPercent(skill: Skill, profile: AssessmentProfile, scores: Partial<Record<Skill, number>>) {
  const existing = scores[skill];
  if (existing !== undefined) return existing;
  return profile.skills.includes(skill) ? 85 : 70;
}

function minimumPreviewPercent(skill: Skill, profile: AssessmentProfile, scores: Partial<Record<Skill, number>>) {
  const existing = scores[skill];
  if (existing !== undefined) return existing;
  return profile.skills.includes(skill) ? 80 : 60;
}

function rankLabel(careerId: string, matches: CareerMatch[], fullCareerCount: number) {
  const rank = matches.findIndex((match) => match.career.id === careerId);
  return rank < 0 ? `Outside top ${fullCareerCount}` : `#${rank + 1}`;
}

export function DashboardView({
  profile,
  skillResults,
  matches,
  onBack,
  onOpenGuidance,
}: {
  profile: AssessmentProfile;
  skillResults: SkillTestResults;
  matches: CareerMatch[];
  onBack: () => void;
  onOpenGuidance: () => void;
}) {
  const actualScores = useMemo(() => getSkillScores(skillResults), [skillResults]);
  const firstTestedSkill = Object.keys(actualScores)[0] as Skill | undefined;
  const firstSkill = firstTestedSkill ?? profile.skills[0] ?? "Python";
  const [selectedSkill, setSelectedSkill] = useState<Skill>(firstSkill);
  const [previewPercent, setPreviewPercent] = useState(() =>
    initialPreviewPercent(firstSkill, profile, actualScores)
  );
  const minimum = minimumPreviewPercent(selectedSkill, profile, actualScores);
  const displayedPercent = Math.max(minimum, previewPercent);
  const simulatedMatches = useMemo(
    () =>
      getCareerMatches(
        {
          ...profile,
          skillScores: { ...actualScores, [selectedSkill]: displayedPercent },
        },
        3
      ),
    [profile, actualScores, selectedSkill, displayedPercent]
  );
  const topMatches = matches.slice(0, 3);
  const matchChartData = topMatches.map((match) => ({
    career: match.career.title,
    score: match.score,
  }));
  const skillChartData = Object.values(skillResults)
    .filter((result) => result !== undefined)
    .map((result) => ({
      skill: result!.skill,
      score: result!.percent,
      level: LEVEL_LABEL[result!.level],
    }));

  function selectSkill(value: string) {
    const next = value as Skill;
    setSelectedSkill(next);
    setPreviewPercent(initialPreviewPercent(next, profile, actualScores));
  }

  function resetPreview() {
    setSelectedSkill(firstSkill);
    setPreviewPercent(initialPreviewPercent(firstSkill, profile, actualScores));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge className="mb-3"><BarChart3 className="h-3.5 w-3.5" aria-hidden /> Career dashboard · Demo</Badge>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Your career dashboard</h2>
          <p className="mt-2 text-sm text-muted-foreground">A visual summary of your current matches and skill checks.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onOpenGuidance}>
            <Sparkles className="h-4 w-4" aria-hidden /> Career guidance
          </Button>
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to matches
          </Button>
        </div>
      </div>

      <div role="note" className="rounded-2xl border border-primary/20 bg-primary-soft p-4 text-sm text-muted-foreground">
        <strong className="font-semibold text-foreground">Demo dashboard.</strong> Charts use your answers in this browser. The what-if preview is temporary and does not change your profile or assessment results.
      </div>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Top career matches</CardTitle>
            <CardDescription>Current ranked results from your profile and completed skill checks.</CardDescription>
          </div>
          <Badge tone="neutral">Sample scoring</Badge>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {topMatches.map((match, index) => (
            <div key={match.career.id} className="rounded-xl border p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-display font-semibold">{match.career.title}</p>
                <Badge tone={FIT_TONE[match.fit]}>{FIT_LABEL[match.fit]}</Badge>
              </div>
              <ProgressBar value={match.score} label={`Match #${index + 1}`} className="mt-4" />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>Match score overview</CardTitle>
              <CardDescription>Demo match scores for your top roles.</CardDescription>
            </div>
            <Badge tone="neutral">Demo</Badge>
          </div>
          <div role="img" aria-label="Bar chart comparing demo match scores for the top three careers" className="mt-5 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchChartData} margin={{ top: 8, right: 8, left: -18, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="career" tick={{ fontSize: 11 }} interval={0} angle={-12} textAnchor="end" height={56} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => [`${value}%`, "Demo match score"]} />
                <Bar dataKey="score" name="Match score" radius={[8, 8, 0, 0]}>
                  {matchChartData.map((entry, index) => (
                    <Cell key={entry.career} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>Skill assessment scores</CardTitle>
              <CardDescription>Scores from sample tests you have completed.</CardDescription>
            </div>
            <Badge tone="neutral">Demo</Badge>
          </div>
          {skillChartData.length > 0 ? (
            <div role="img" aria-label="Bar chart of completed sample skill assessment scores" className="mt-5 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillChartData} margin={{ top: 8, right: 8, left: -18, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="skill" tick={{ fontSize: 11 }} interval={0} angle={-12} textAnchor="end" height={56} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => [`${value}%`, "Sample score"]} />
                  <Bar dataKey="score" name="Sample score" fill="#0891b2" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="mt-5 flex h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 px-6 text-center">
              <SlidersHorizontal className="h-8 w-8 text-muted-foreground" aria-hidden />
              <p className="mt-3 font-medium">No sample scores yet</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">Take an optional Python, SQL, or problem-solving sample test from your career results to see its score here.</p>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-6 sm:p-8">
        <div>
          <CardTitle>Compare your top career paths</CardTitle>
          <CardDescription>See the current fit and the next skills suggested for each role.</CardDescription>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {topMatches.map((match, index) => (
            <article key={match.career.id} className="rounded-xl border p-4">
              <div className="flex items-center justify-between gap-2">
                <Badge tone="neutral">#{index + 1}</Badge>
                <span className="text-sm font-semibold">{match.score}%</span>
              </div>
              <h3 className="mt-3 font-display font-semibold">{match.career.title}</h3>
              <Badge tone={FIT_TONE[match.fit]} className="mt-2">{FIT_LABEL[match.fit]}</Badge>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Build next</p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {match.skillsToBuild.slice(0, 3).map((item) => <li key={item.label}>• {item.label}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Card>

      <Card className="border-primary/20 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>What if you improved one skill?</CardTitle>
            <CardDescription>Preview a new skill score and see how the top three might reorder.</CardDescription>
          </div>
          <Badge tone="warning">Temporary preview</Badge>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="space-y-5">
            <label className="block text-sm font-medium" htmlFor="what-if-skill">
              Choose a skill
              <select
                id="what-if-skill"
                value={selectedSkill}
                onChange={(event) => selectSkill(event.target.value)}
                className="mt-2 block h-11 w-full rounded-xl border bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {SKILLS.map((skill) => <option key={skill} value={skill}>{skill}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium" htmlFor="what-if-score">
              Preview skill score: {displayedPercent}%
              <input
                id="what-if-score"
                type="range"
                min={minimum}
                max={100}
                step={5}
                value={displayedPercent}
                onChange={(event) => setPreviewPercent(Number(event.target.value))}
                className="mt-3 block w-full accent-primary"
              />
            </label>
            <p className="text-xs text-muted-foreground">
              {actualScores[selectedSkill] !== undefined
                ? `Your actual sample score is ${actualScores[selectedSkill]}%. This preview temporarily models a score of ${displayedPercent}%.`
                : profile.skills.includes(selectedSkill)
                  ? "This skill is currently self-reported. The preview models a sample-check score to see how stronger evidence could affect matches."
                  : "This skill is not in your profile. The preview models a sample-check score to see how demonstrating it could affect matches."}
            </p>
            <Button variant="outline" size="sm" onClick={resetPreview}>
              <RotateCcw className="h-4 w-4" aria-hidden /> Reset preview
            </Button>
          </div>

          <div aria-live="polite" className="space-y-3">
            {simulatedMatches.map((match, index) => {
              const currentRank = rankLabel(match.career.id, topMatches, 3);
              return (
                <div key={match.career.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
                  <div>
                    <p className="font-medium">{match.career.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Now {currentRank} · Preview #{index + 1}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone={FIT_TONE[match.fit]}>{FIT_LABEL[match.fit]}</Badge>
                    <span className="w-12 text-right text-sm font-semibold">{match.score}%</span>
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-muted-foreground">Preview rankings use the same local demo scoring rules. Your actual profile and results remain unchanged.</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap justify-center gap-3 pt-1">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to matches
        </Button>
        <Button variant="ghost" onClick={onOpenGuidance}>
          <Sparkles className="h-4 w-4" aria-hidden /> View career guidance
        </Button>
      </div>
    </div>
  );
}
