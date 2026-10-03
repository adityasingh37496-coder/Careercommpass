"use client";

import { useState } from "react";
import { ArrowLeft, BookOpen, Compass, FileText, Lightbulb, Sparkles, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { STAGE_OPTIONS } from "@/data/assessment";
import type { CareerMatch, EducationStage } from "@/types/assessment";

const SKILL_PRACTICE: Record<string, string> = {
  Python: "Write a small script that cleans a messy CSV and summarizes its key values.",
  SQL: "Practice filtering, grouping, and joining two small tables; explain what each query reveals.",
  Excel: "Build a tidy spreadsheet with formulas, filters, and a simple summary table.",
  "Data visualization": "Turn a small dataset into one chart and write the takeaway in a single sentence.",
  Statistics: "Choose a simple question, calculate an average and spread, and explain what the numbers cannot tell you.",
  "Machine learning": "Train a tiny beginner model on a public example dataset and compare its predictions with actual values.",
  JavaScript: "Build a small interactive page that responds to a user's input.",
  React: "Create a small reusable component and show how it handles different props or states.",
  Java: "Write a small program that reads structured input, validates it, and returns a useful result.",
  APIs: "Connect a sample interface to a mock endpoint and handle loading, success, and error states.",
  Git: "Make a short project history with clear commits and a README explaining how to run it.",
  "UI/UX design": "Redesign one familiar screen and explain the user problem behind each change.",
  Wireframing: "Sketch three key screens for a simple product and map how a user moves between them.",
  Communication: "Write a one-page project brief and present its main idea in two minutes.",
  "Project management": "Break a small project into tasks, owners, and a realistic one-week timeline.",
  Writing: "Create a short guide that helps a new user complete one task without extra help.",
  Research: "Compare three sources on one question and summarize the evidence and its limits.",
  "Problem solving": "Solve one small problem, record your approach, and explain why you chose it.",
  "Social media": "Plan a one-week content calendar for a campus club and define one success measure.",
  SEO: "Improve a sample article title and outline around one search question, then explain the choices.",
};

const PROJECT_IDEA: Record<string, string> = {
  "data-analyst": "Analyze a small campus or public dataset. Clean it, answer three questions, and present the findings in a one-page dashboard.",
  "data-scientist": "Use a sample dataset to explore a question, build a simple baseline model, and explain where its predictions are uncertain.",
  "ml-engineer": "Package a small sample model behind a simple local interface and document how another student can run it.",
  "data-engineer": "Build a small local data pipeline that cleans a CSV and saves a consistent output table.",
  "bi-analyst": "Create a dashboard around a clear audience question, then write three decisions the dashboard could support.",
  "frontend-developer": "Build a responsive page from a simple design brief and document its keyboard and mobile behavior.",
  "backend-developer": "Design a small mock API, document its inputs and outputs, and show how it handles invalid data.",
  "fullstack-developer": "Create a small local app with a form and results view using sample data, then describe how its pieces fit together.",
  "software-engineer": "Build a small useful tool, add a few example checks, and explain the choices you made in the README.",
  "qa-engineer": "Choose a familiar app, write test scenarios for one user flow, and record clear steps for reproducing a sample bug.",
  "ux-designer": "Improve one task in a familiar app: show the before-and-after flow and explain the design decisions.",
  "ux-researcher": "Plan a small usability study with a clear question, a short interview guide, and a summary template.",
  "product-manager": "Write a one-page product brief with a user problem, a proposed solution, and simple success measures.",
  "business-analyst": "Map a familiar process, identify one bottleneck, and present a data-backed improvement idea.",
  "project-manager": "Plan a small student project with milestones, risks, owners, and a short progress update.",
  "financial-analyst": "Build a simple sample budget model and explain the assumptions and the effect of changing one assumption.",
  "marketing-analyst": "Compare sample campaign results and recommend where to focus next, with a chart and clear assumptions.",
  "digital-marketer": "Create a small campaign plan for a campus event with a target audience, sample posts, and a way to measure reach.",
  "content-strategist": "Create a short content plan around one audience question and show how each piece supports the goal.",
  "technical-writer": "Write a quick-start guide for a small tool and ask someone unfamiliar with it to follow the steps.",
  "research-analyst": "Answer one focused question using a few credible sources and present the evidence with its limitations.",
};

const STAGE_NEXT_STEP: Record<EducationStage, string> = {
  "pre-final-year": "Use this project to explore the role, then look for a course, club activity, or internship where you can practice the same skills.",
  "final-year": "Turn the project into a concise portfolio piece and practice describing your decisions for placement interviews.",
  "fresh-graduate": "Add the project to your portfolio, tailor its summary to a target role, and use it as a discussion point when applying.",
};

function practiceFor(skill: string): string {
  return SKILL_PRACTICE[skill] ?? `Choose one beginner task that uses ${skill}, complete it, and write down what you learned.`;
}

export function GuidanceView({
  match,
  stage,
  onBack,
}: {
  match: CareerMatch;
  stage: EducationStage | null;
  onBack: () => void;
}) {
  const [showResumeExample, setShowResumeExample] = useState(false);
  const prioritySkills = match.skillsToBuild.slice(0, 3);
  const firstSkill = prioritySkills[0]?.label;
  const stageOption = STAGE_OPTIONS.find((option) => option.value === stage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge className="mb-3"><Sparkles className="h-3.5 w-3.5" aria-hidden /> Career guidance · Demo</Badge>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            A practical next-step plan for {match.career.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Built from your current demo match and skill check results.
          </p>
        </div>
        <Button variant="outline" onClick={onBack} className="shrink-0 self-start sm:self-auto">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to matches
        </Button>
      </div>

      <div role="note" className="flex gap-3 rounded-2xl border border-primary/20 bg-primary-soft p-4 text-sm">
        <Compass className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
        <p className="text-muted-foreground">
          <strong className="font-semibold text-foreground">Demo guidance.</strong> This plan is assembled from
          local sample rules and content. It is not generated by AI or professional career advice.
        </p>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Lightbulb className="h-5 w-5" aria-hidden />
          </span>
          <CardTitle>Why this role appeared near the top</CardTitle>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{match.explanation}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Demo match score: {match.score}% · {match.fit === "strong" ? "Strong match" : match.fit === "good" ? "Good match" : "Worth exploring"}
        </p>
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <Target className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <CardTitle>Your highest-priority skills</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Taken from the skill gaps in your top match.</p>
          </div>
        </div>
        <ol className="mt-5 space-y-3">
          {prioritySkills.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-start gap-3 rounded-xl border p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                {index + 1}
              </span>
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.reason}</p>
                <p className="mt-2 text-sm"><span className="font-medium">Try:</span> {practiceFor(item.label)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <BookOpen className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <CardTitle>Your starter roadmap</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Three manageable steps for exploring this direction.</p>
          </div>
        </div>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          <li className="rounded-xl border p-4">
            <Badge tone="neutral">Step 1 · Learn</Badge>
            <h3 className="mt-3 font-semibold">Practice {firstSkill ?? "a priority skill"}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {firstSkill ? practiceFor(firstSkill) : "Choose one skill from your match and complete a small beginner exercise."}
            </p>
          </li>
          <li className="rounded-xl border p-4">
            <Badge tone="neutral">Step 2 · Build</Badge>
            <h3 className="mt-3 font-semibold">Make a sample project</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {PROJECT_IDEA[match.career.id] ?? `Create a small project that demonstrates a typical task in ${match.career.title}.`}
            </p>
          </li>
          <li className="rounded-xl border p-4">
            <Badge tone="neutral">Step 3 · Share</Badge>
            <h3 className="mt-3 font-semibold">Show what you learned</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {stage ? STAGE_NEXT_STEP[stage] : "Write a short project summary, note your decisions, and share it in a portfolio."}
            </p>
          </li>
        </ol>
        {stageOption && (
          <p className="mt-5 rounded-xl bg-muted p-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">For your stage:</span> {stageOption.tip}
          </p>
        )}
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <FileText className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <CardTitle>Sample resume feedback</CardTitle>
              <CardDescription>This is an example only. No resume was uploaded or reviewed.</CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" aria-expanded={showResumeExample} onClick={() => setShowResumeExample((value) => !value)}>
            {showResumeExample ? "Hide example" : "Show example"}
          </Button>
        </div>
        {showResumeExample && (
          <div className="mt-5 space-y-4 rounded-xl border bg-muted/40 p-4 text-sm">
            <div>
              <Badge tone="neutral">Made-up resume bullet</Badge>
              <p className="mt-2 font-medium">“Built an Excel dashboard for a campus event team.”</p>
            </div>
            <div>
              <Badge tone="success">What works</Badge>
              <p className="mt-2 text-muted-foreground">It names a project and a tool, giving a reader something concrete to ask about.</p>
            </div>
            <div>
              <Badge tone="accent">How to strengthen it</Badge>
              <p className="mt-2 text-muted-foreground">
                Add what the dashboard helped the team understand or do. For example: “Built an Excel dashboard to track event sign-ups, helping the team spot low-registration sessions and adjust promotion.”
              </p>
            </div>
            <p className="text-xs text-muted-foreground">The example is fictional and is not personalized to your resume.</p>
          </div>
        )}
      </Card>

      <div className="flex justify-center pt-1">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to matches
        </Button>
      </div>
    </div>
  );
}
