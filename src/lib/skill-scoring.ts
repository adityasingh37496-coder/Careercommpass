import type { Skill } from "@/data/assessment";
import type {
  SkillLevel,
  SkillTest,
  SkillTestResult,
  SkillTestResults,
} from "@/types/skill-test";

export const LEVEL_LABEL: Record<SkillLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const LEVEL_TONE = {
  beginner: "warning",
  intermediate: "primary",
  advanced: "success",
} as const;

/** 80%+ advanced, 60-79% intermediate, below 60% beginner. */
export function levelFor(percent: number): SkillLevel {
  if (percent >= 80) return "advanced";
  if (percent >= 60) return "intermediate";
  return "beginner";
}

/** Local scoring only: compares chosen option indexes with the static answer key. */
export function scoreTest(test: SkillTest, answers: (number | null)[]): SkillTestResult {
  const total = test.questions.length;
  const score = test.questions.reduce(
    (sum, q, i) => (answers[i] === q.correctIndex ? sum + 1 : sum),
    0
  );
  const percent = Math.round((score / total) * 100);
  return {
    testId: test.id,
    skill: test.skill,
    score,
    total,
    percent,
    level: levelFor(percent),
    answers,
  };
}

/** Maps finished tests to the profile skills they provide evidence for. */
export function getSkillLevels(results: SkillTestResults): Partial<Record<Skill, SkillLevel>> {
  const levels: Partial<Record<Skill, SkillLevel>> = {};
  for (const result of Object.values(results)) {
    if (result) levels[result.skill] = result.level;
  }
  return levels;
}

/** Maps finished tests to the percent score (0-100) for the profile skill they cover. */
export function getSkillScores(results: SkillTestResults): Partial<Record<Skill, number>> {
  const scores: Partial<Record<Skill, number>> = {};
  for (const result of Object.values(results)) {
    if (result) scores[result.skill] = result.percent;
  }
  return scores;
}
