import type { Audience } from "@/types";

export const SKILLS = [
  "Python",
  "SQL",
  "Excel",
  "Data visualization",
  "Statistics",
  "Machine learning",
  "JavaScript",
  "React",
  "Java",
  "APIs",
  "Git",
  "UI/UX design",
  "Wireframing",
  "Communication",
  "Project management",
  "Writing",
  "Research",
  "Problem solving",
  "Social media",
  "SEO",
] as const;
export type Skill = (typeof SKILLS)[number];

export const INTERESTS = [
  "Data & analytics",
  "Building software",
  "Design & creativity",
  "Business & strategy",
  "Emerging technology",
  "Research & science",
  "Helping people",
  "Marketing & media",
  "Finance & economics",
] as const;
export type Interest = (typeof INTERESTS)[number];

export interface StageOption {
  value: Audience;
  label: string;
  description: string;
  /** Shown on the results screen. */
  tip: string;
}

export const STAGE_OPTIONS: StageOption[] = [
  {
    value: "pre-final-year",
    label: "Pre-final-year student",
    description: "Still a year or more from graduating and exploring options.",
    tip: "You have time on your side. Use the coming semesters for projects and an internship in your top direction.",
  },
  {
    value: "final-year",
    label: "Final-year student",
    description: "Graduating soon and preparing for placements or applications.",
    tip: "Narrow down to one or two target roles and close the biggest skill gaps before placement season.",
  },
  {
    value: "fresh-graduate",
    label: "Fresh graduate",
    description: "Recently graduated and working out the first move.",
    tip: "Pick a lead direction and build one portfolio project for it while you start applying.",
  },
];

export const MIN_SKILLS = 2;
export const MIN_INTERESTS = 1;
export const NOTES_MAX_LENGTH = 500;
