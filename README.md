# CareerCompass AI

> Turn your skills into your career direction.

Career discovery frontend prototype for pre-final-year students, final-year students, and fresh graduates.

**Status: Phase 7 — hackathon-ready frontend demo** with 21 sample careers, transparent local scoring, sample skill assessments, career guidance, an interactive dashboard, and a one-click sample walkthrough (no backend, auth, AI APIs or external services).

## Run

```bash
npm.cmd ci
npm.cmd run dev      # http://localhost:3000 (PowerShell on Windows)
npm.cmd run typecheck
npm.cmd run build
```

## Routes

- `/` landing page
- `/assessment` career discovery: profile form, then demo results (local mock matching, no backend). Choose your own profile or select **Explore with sample profile** for a one-click presentation path. The sample path loads clearly labeled example answers and local skill-check scores. From results, take or retake optional 5-question Python, SQL and problem-solving checks. The top roles show scores, explanations, skill gaps and score breakdowns. **View my guidance** opens a local sample plan; **Dashboard** opens match and completed skill-test charts, a top-role comparison, and a temporary what-if preview that does not change the actual profile or scores.

## Structure

```
src/
  app/                 routes (App Router), layout, globals.css, loading and error screens
  components/
    ui/                primitives: Button, Card, Badge
    assessment/        profile, matching results, skill checks, career guidance, and dashboard
    layout/            Navbar, Footer, Container
    shared/            Logo, SectionHeading, other reusable pieces
  data/                static data (careers, form options, sample skill-test questions)
  hooks/               custom hooks
  lib/                 utils (cn), constants (brand, nav)
  types/               shared TypeScript types
```

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS 3 · Lucide React · Recharts

## How matching works (src/lib/matching.ts)

Local rules only: no AI, backend or external calls. Careers live in `src/data/careers.ts`, each with weighted skills (3 core, 2 important, 1 helpful) and interests.

- Score = up to 70 points from skills + up to 30 from interests, capped at 96.
- Skill credit per skill: selected and untested = 85%; selected with a sample test = 30% + 70% of the test percent; not selected but test >= 60% = 80% of the test percent; otherwise 0.
- Interest points: two matched interests earn the full 30.
- Skills to build next: ranked by weight x missing credit; skills at 70% credit or more count as covered. When nothing is missing, the role's stretch skills are shown.
- Stage and notes do not change scores.

To add a career, append an entry to `CAREERS` using skills from `SKILLS` and interests from `INTERESTS` in `src/data/assessment.ts`.

## Demo walkthrough

See [DEMO_GUIDE.md](./DEMO_GUIDE.md) for a short presenter script and the sample walkthrough steps. This app is a local frontend prototype; it is not deployed and does not use real AI or a backend.
