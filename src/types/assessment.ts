import type { Interest, Skill } from "@/data/assessment";
import type { SkillLevel } from "@/types/skill-test";
import type { Audience } from "@/types";

export type EducationStage = Audience;

export interface AssessmentProfile {
  stage: EducationStage | null;
  skills: Skill[];
  interests: Interest[];
  notes: string;
}

/** 3 = core to the role, 2 = important, 1 = helpful. */
export type SkillWeight = 1 | 2 | 3;

export interface CareerSkill {
  skill: Skill;
  weight: SkillWeight;
}

export interface Career {
  id: string;
  title: string;
  summary: string;
  skills: CareerSkill[];
  interests: Interest[];
  /** Suggested when the user already covers the role's skills. */
  stretchSkills: string[];
}

export type FitLevel = "strong" | "good" | "exploring";

/** Where the credit for one skill came from. */
export type CreditSource = "self-reported" | "test-backed" | "test-only" | "none";

export interface SkillDetail {
  skill: Skill;
  weight: SkillWeight;
  /** 0-1 share of this skill's weight that the user earned. */
  credit: number;
  source: CreditSource;
  /** Sample test percent (0-100) if a test covers this skill. */
  testPercent?: number;
}

export type SkillToBuildKind = "missing" | "strengthen" | "stretch";

export interface SkillToBuild {
  label: string;
  kind: SkillToBuildKind;
  reason: string;
}

export interface CareerMatch {
  career: Career;
  /** 0-100, capped below 100 on purpose. */
  score: number;
  fit: FitLevel;
  /** Points out of 70 from skills and out of 30 from interests (before the cap). */
  breakdown: { skillPoints: number; interestPoints: number };
  skillDetails: SkillDetail[];
  /** Skills with some credit, strongest first. */
  matchedSkills: Skill[];
  matchedInterests: Interest[];
  /** Skills of this career that a sample skill check covered. */
  assessedSkills: { skill: Skill; percent: number; level: SkillLevel }[];
  skillsToBuild: SkillToBuild[];
  explanation: string;
}
