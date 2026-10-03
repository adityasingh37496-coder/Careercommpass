import { SKILL_TESTS } from "@/data/skill-tests";
import { scoreTest } from "@/lib/skill-scoring";
import type { AssessmentProfile } from "@/types/assessment";
import type { SkillTestId, SkillTestResults } from "@/types/skill-test";

const DEMO_PROFILE: AssessmentProfile = {
  stage: "final-year",
  skills: ["Python", "SQL", "Excel", "Statistics", "Communication", "Problem solving"],
  interests: ["Data & analytics", "Business & strategy", "Emerging technology"],
  notes: "I enjoy finding patterns and explaining what they mean.",
};

const DEMO_WRONG_ANSWERS: Record<SkillTestId, number[]> = {
  python: [3],
  sql: [1, 4],
  "problem-solving": [2],
};

export function createDemoProfile(): AssessmentProfile {
  return {
    ...DEMO_PROFILE,
    skills: [...DEMO_PROFILE.skills],
    interests: [...DEMO_PROFILE.interests],
  };
}

/** Creates plausible sample test scores locally for a fast presentation walkthrough. */
export function createDemoSkillResults(): SkillTestResults {
  const results: SkillTestResults = {};

  for (const test of SKILL_TESTS) {
    const wrongIndexes = new Set(DEMO_WRONG_ANSWERS[test.id]);
    const answers = test.questions.map((question, index) =>
      wrongIndexes.has(index) ? (question.correctIndex + 1) % question.options.length : question.correctIndex
    );
    results[test.id] = scoreTest(test, answers);
  }

  return results;
}
