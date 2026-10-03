import {
  BarChart3,
  Briefcase,
  FileText,
  GraduationCap,
  Rocket,
  Route,
  SlidersHorizontal,
  Target,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Target,
    title: "Skill-to-role matching",
    description:
      "See sample career matches ranked from the skills and interests you select.",
  },
  {
    icon: BarChart3,
    title: "Skill gap analysis",
    description:
      "See which skills overlap with a role and which the demo suggests building next.",
  },
  {
    icon: Route,
    title: "Personalized roadmap",
    description:
      "Explore a locally assembled starter plan with practice ideas and a sample project.",
  },
  {
    icon: FileText,
    title: "Resume insights",
    description:
      "See a fictional example of how a project bullet might be made clearer. No resume is uploaded.",
  },
  {
    icon: Briefcase,
    title: "Compare career paths",
    description:
      "Compare demo match scores, fit labels and skills to build for your top roles.",
  },
  {
    icon: SlidersHorizontal,
    title: "What-if exploration",
    description:
      "Preview how demonstrating a stronger skill could change your sample match rankings.",
  },
];

export interface Step {
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  {
    title: "Tell us about you",
    description:
      "Choose your education stage, skills and interests, or jump into the sample walkthrough.",
  },
  {
    title: "Explore your matches",
    description:
      "Review local demo matches, see the scoring reasons, and optionally try sample skill checks.",
  },
  {
    title: "Follow your roadmap",
    description:
      "Compare career paths, preview a skill improvement, and explore a starter project plan.",
  },
];

export interface Audience {
  icon: LucideIcon;
  title: string;
  tagline: string;
  points: string[];
}

export const AUDIENCES: Audience[] = [
  {
    icon: GraduationCap,
    title: "Pre-final-year students",
    tagline: "Explore early, with time on your side.",
    points: [
      "Discover roles you haven't considered",
      "Pick electives, projects and internships with purpose",
      "Build skills before placement season",
    ],
  },
  {
    icon: Target,
    title: "Final-year students",
    tagline: "Focus your effort where it counts.",
    points: [
      "Narrow down to a few strong target roles",
      "Close your highest-impact skill gaps",
      "Prepare for interviews with a plan",
    ],
  },
  {
    icon: Rocket,
    title: "Fresh graduates",
    tagline: "Move from uncertain to intentional.",
    points: [
      "Reframe your degree for the roles you want",
      "Compare paths before committing",
      "Get a clear plan for your first move",
    ],
  },
];

export interface MatchSample {
  role: string;
  score: number;
}

/** Sample data for illustrative previews only. */
export const SAMPLE_MATCHES: MatchSample[] = [
  { role: "Data Analyst", score: 92 },
  { role: "Product Analyst", score: 86 },
  { role: "Business Analyst", score: 81 },
];

export const SAMPLE_SKILLS = ["Python", "SQL", "Statistics", "Excel", "Communication"];

export interface SkillGapSample {
  skill: string;
  current: number;
  needed: number;
}

export const SAMPLE_GAPS: SkillGapSample[] = [
  { skill: "SQL", current: 70, needed: 85 },
  { skill: "Data visualization", current: 45, needed: 80 },
  { skill: "Statistics", current: 60, needed: 75 },
  { skill: "Storytelling with data", current: 35, needed: 70 },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "Who is CareerCompass AI for?",
    answer:
      "Pre-final-year students, final-year students and fresh graduates who want a clearer view of which careers fit them and how to get there.",
  },
  {
    question: "What if I don't know what I want to do yet?",
    answer:
      "That's a good place to start. Choose a few skills and interests, then explore the sample career directions the demo ranks for you.",
  },
  {
    question: "What do I need to get started?",
    answer:
      "Choose an education stage, at least two skills, and one interest. You can use the sample profile to skip straight to a walkthrough.",
  },
  {
    question: "Will it tell me exactly what job to take?",
    answer:
      "No. It offers sample ranked options and a starter plan to explore. A career choice depends on much more than this demo can measure.",
  },
  {
    question: "Are these real AI recommendations?",
    answer:
      "No. This hackathon prototype uses local sample scoring rules and example guidance. Your answers stay in the current browser tab and are not sent to a service.",
  },
  {
    question: "Is this the finished product?",
    answer:
      "This is a hackathon frontend demo. Matching uses local sample rules, guidance is sample content, and no AI service or backend is connected.",
  },
];
