import type { Skill } from "@/data/assessment";

export type SkillTestId = "python" | "sql" | "problem-solving";
export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface SkillQuestion {
  id: string;
  prompt: string;
  /** Optional code or query shown in a monospace block under the prompt. */
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SkillTest {
  id: SkillTestId;
  title: string;
  /** The profile skill this test provides evidence for. */
  skill: Skill;
  tagline: string;
  instructions: string[];
  questions: SkillQuestion[];
  /** Plain-language summary shown for each level. */
  summaries: Record<SkillLevel, string>;
}

export interface SkillTestResult {
  testId: SkillTestId;
  skill: Skill;
  score: number;
  total: number;
  /** 0-100, rounded. */
  percent: number;
  level: SkillLevel;
  /** Chosen option index per question (null = unanswered). */
  answers: (number | null)[];
}

export type SkillTestResults = Partial<Record<SkillTestId, SkillTestResult>>;
