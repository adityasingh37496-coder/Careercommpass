import { MIN_INTERESTS, MIN_SKILLS } from "@/data/assessment";
import type { AssessmentProfile } from "@/types/assessment";

export type AssessmentField = "stage" | "skills" | "interests";
export type AssessmentErrors = Partial<Record<AssessmentField, string>>;

/** Order matches the order of sections on the form. */
export const FIELD_ORDER: AssessmentField[] = ["stage", "skills", "interests"];

export function validateProfile(profile: AssessmentProfile): AssessmentErrors {
  const errors: AssessmentErrors = {};
  if (!profile.stage) {
    errors.stage = "Choose the option that best describes where you are right now.";
  }
  if (profile.skills.length < MIN_SKILLS) {
    errors.skills = `Select at least ${MIN_SKILLS} skills so we have something to work with.`;
  }
  if (profile.interests.length < MIN_INTERESTS) {
    errors.interests = `Select at least ${MIN_INTERESTS} interest.`;
  }
  return errors;
}

export function hasErrors(errors: AssessmentErrors): boolean {
  return Object.keys(errors).length > 0;
}
