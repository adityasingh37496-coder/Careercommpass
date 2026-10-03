import { CAREERS } from "@/data/careers";
import type { Skill } from "@/data/assessment";
import { LEVEL_LABEL, levelFor } from "@/lib/skill-scoring";
import type {
  AssessmentProfile,
  Career,
  CareerMatch,
  CreditSource,
  FitLevel,
  SkillDetail,
  SkillToBuild,
  SkillWeight,
} from "@/types/assessment";

/**
 * Transparent matching rules (local only, no AI):
 *
 *   score = 70 points from skills + 30 points from interests (capped at 96)
 *
 * Skills: every career lists skills with a weight (3 core, 2 important, 1 helpful).
 *   skill points = 70 x (sum of weight x credit) / (sum of weights)
 *
 * Credit for one skill (0 to 1), using the optional sample test percent P:
 *   - selected, no test        -> 0.85 (self-reported, not yet backed up)
 *   - selected + test          -> 0.30 + 0.70 x P/100 (30% for claiming it, 70% for the test)
 *   - not selected + test >=60 -> 0.80 x P/100 (you showed it even if you did not tick it)
 *   - not selected, no/low test -> 0
 *
 * Interests: 30 x (matched interests / 2), full credit at two matches
 *   (or one match for a career that lists only one interest).
 *
 * Skills to build next are ranked by weight x (1 - credit); skills with
 * credit of 0.70 or more are treated as covered.
 */
export const SKILL_POINTS = 70;
export const INTEREST_POINTS = 30;
export const INTEREST_FULL_CREDIT = 2;
export const MAX_SCORE = 96;
export const RESULT_COUNT = 3;
export const MAX_SKILLS_TO_BUILD = 4;

export const SELF_REPORTED_CREDIT = 0.85;
export const SELECTED_CLAIM_SHARE = 0.3;
export const SELECTED_TEST_SHARE = 0.7;
export const UNSELECTED_TEST_FACTOR = 0.8;
export const UNSELECTED_MIN_PERCENT = 60;
export const COVERED_CREDIT = 0.7;

export const WEIGHT_LABEL: Record<SkillWeight, string> = {
  3: "Core",
  2: "Important",
  1: "Helpful",
};

type MatchInput = Pick<AssessmentProfile, "skills" | "interests"> & {
  /** Sample test percent (0-100) keyed by the profile skill the test covers. */
  skillScores?: Partial<Record<Skill, number>>;
};

function creditFor(
  selected: boolean,
  percent: number | undefined
): { credit: number; source: CreditSource } {
  if (selected && percent === undefined) {
    return { credit: SELF_REPORTED_CREDIT, source: "self-reported" };
  }
  if (selected && percent !== undefined) {
    return {
      credit: SELECTED_CLAIM_SHARE + SELECTED_TEST_SHARE * (percent / 100),
      source: "test-backed",
    };
  }
  if (percent !== undefined && percent >= UNSELECTED_MIN_PERCENT) {
    return { credit: UNSELECTED_TEST_FACTOR * (percent / 100), source: "test-only" };
  }
  return { credit: 0, source: "none" };
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function fitFor(score: number): FitLevel {
  if (score >= 75) return "strong";
  if (score >= 50) return "good";
  return "exploring";
}

function buildSkillsToBuild(career: Career, details: SkillDetail[]): SkillToBuild[] {
  const gaps = details
    .filter((d) => d.credit < COVERED_CREDIT)
    .map((d) => ({ d, priority: d.weight * (1 - d.credit) }))
    .sort((a, b) => b.priority - a.priority || b.d.weight - a.d.weight)
    .slice(0, MAX_SKILLS_TO_BUILD)
    .map(({ d }): SkillToBuild => {
      const importance = WEIGHT_LABEL[d.weight].toLowerCase();
      if (d.source === "test-backed") {
        return {
          label: d.skill,
          kind: "strengthen",
          reason: `You selected it, but your sample check scored ${d.testPercent}%. It is a ${importance} skill here.`,
        };
      }
      if (d.source === "test-only") {
        return {
          label: d.skill,
          kind: "strengthen",
          reason: `Your sample check scored ${d.testPercent}%, but you did not select it, so it earns only partial credit.`,
        };
      }
      return {
        label: d.skill,
        kind: "missing",
        reason:
          d.testPercent !== undefined
            ? `${WEIGHT_LABEL[d.weight]} skill here. Your sample check scored ${d.testPercent}%.`
            : `${WEIGHT_LABEL[d.weight]} skill here and not in your profile yet.`,
      };
    });

  if (gaps.length > 0) return gaps;
  return career.stretchSkills.map((label) => ({
    label,
    kind: "stretch",
    reason: "You cover the core skills, so this is a good way to level up.",
  }));
}

function scoreCareer(career: Career, { skills, interests, skillScores = {} }: MatchInput): CareerMatch {
  const skillDetails: SkillDetail[] = career.skills.map(({ skill, weight }) => {
    const testPercent = skillScores[skill];
    const { credit, source } = creditFor(skills.includes(skill), testPercent);
    return { skill, weight, credit, source, testPercent };
  });

  const totalWeight = skillDetails.reduce((sum, d) => sum + d.weight, 0);
  const earned = skillDetails.reduce((sum, d) => sum + d.weight * d.credit, 0);
  const matchedInterests = career.interests.filter((i) => interests.includes(i));
  const interestTarget = Math.min(INTEREST_FULL_CREDIT, career.interests.length);

  const skillPoints = Math.round(SKILL_POINTS * (earned / totalWeight));
  const interestPoints = Math.round(
    INTEREST_POINTS * Math.min(1, matchedInterests.length / interestTarget)
  );
  const score = Math.min(MAX_SCORE, skillPoints + interestPoints);

  const matched = skillDetails
    .filter((d) => d.credit > 0)
    .sort((a, b) => b.weight * b.credit - a.weight * a.credit);
  const matchedSkills = matched.map((d) => d.skill);
  const assessedSkills = skillDetails.flatMap((d) =>
    d.testPercent === undefined
      ? []
      : [{ skill: d.skill, percent: d.testPercent, level: levelFor(d.testPercent) }]
  );

  const sentences: string[] = [career.summary];
  if (matched.length > 0) {
    const top = matched.slice(0, 3).map((d) => d.skill);
    sentences.push(
      `Your strongest overlap is ${joinList(top)}, which carry${top.length === 1 ? "es" : ""} the most weight for this role.`
    );
  } else {
    sentences.push("None of your selected skills are part of this role yet, so treat it as a stretch direction.");
  }
  if (matchedInterests.length > 0) {
    sentences.push(
      `Your interest in ${joinList(matchedInterests.map((i) => i.toLowerCase()))} fits the day-to-day work.`
    );
  }
  if (assessedSkills.length > 0) {
    sentences.push(
      `Your sample checks: ${joinList(
        assessedSkills.map((a) => `${a.skill} ${a.percent}% (${LEVEL_LABEL[a.level].toLowerCase()})`)
      )}.`
    );
  }

  return {
    career,
    score,
    fit: fitFor(score),
    breakdown: { skillPoints, interestPoints },
    skillDetails,
    matchedSkills,
    matchedInterests,
    assessedSkills,
    skillsToBuild: buildSkillsToBuild(career, skillDetails),
    explanation: sentences.join(" "),
  };
}

function matchedWeight(match: CareerMatch): number {
  return match.skillDetails.reduce((sum, d) => sum + (d.credit > 0 ? d.weight : 0), 0);
}

/** Returns the top matches, best first. Deterministic for the same input. */
export function getCareerMatches(input: MatchInput, limit: number = RESULT_COUNT): CareerMatch[] {
  return CAREERS.map((career) => scoreCareer(career, input))
    .sort(
      (a, b) =>
        b.score - a.score ||
        matchedWeight(b) - matchedWeight(a) ||
        a.career.title.localeCompare(b.career.title)
    )
    .slice(0, limit);
}
