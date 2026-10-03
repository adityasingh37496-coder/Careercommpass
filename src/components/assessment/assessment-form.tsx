"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowRight, GraduationCap, Rocket, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OptionCard } from "@/components/ui/option-card";
import { Textarea } from "@/components/ui/textarea";
import { ToggleChip } from "@/components/ui/toggle-chip";
import {
  INTERESTS,
  MIN_INTERESTS,
  MIN_SKILLS,
  NOTES_MAX_LENGTH,
  SKILLS,
  STAGE_OPTIONS,
} from "@/data/assessment";
import { cn } from "@/lib/utils";
import { FIELD_ORDER, hasErrors, validateProfile } from "@/lib/validation";
import type { AssessmentProfile, EducationStage } from "@/types/assessment";

const STAGE_ICONS: Record<EducationStage, ReactNode> = {
  "pre-final-year": <GraduationCap className="h-5 w-5" aria-hidden />,
  "final-year": <Target className="h-5 w-5" aria-hidden />,
  "fresh-graduate": <Rocket className="h-5 w-5" aria-hidden />,
};

function toggleItem<T>(list: readonly T[], item: T): T[] {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}

interface FormSectionProps {
  id: string;
  title: string;
  description?: string;
  meta?: string;
  error?: string;
  children: ReactNode;
}

function FormSection({ id, title, description, meta, error, children }: FormSectionProps) {
  return (
    <Card className={cn("p-6 sm:p-8", error && "border-danger/50")}>
      <fieldset
        id={`field-${id}`}
        tabIndex={-1}
        aria-describedby={error ? `field-${id}-error` : undefined}
        className="min-w-0 outline-none"
      >
        <legend className="font-display text-lg font-semibold">{title}</legend>
        {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
        {meta && (
          <p className="mt-3 text-xs font-medium text-muted-foreground" aria-live="polite">
            {meta}
          </p>
        )}
        <div className="mt-5">{children}</div>
        {error && (
          <p
            id={`field-${id}-error`}
            role="alert"
            className="mt-4 flex items-center gap-1.5 text-sm text-danger"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
            {error}
          </p>
        )}
      </fieldset>
    </Card>
  );
}

interface AssessmentFormProps {
  profile: AssessmentProfile;
  onChange: (next: AssessmentProfile) => void;
  onSubmit: () => void;
  onUseDemo: () => void;
}

export function AssessmentForm({ profile, onChange, onSubmit, onUseDemo }: AssessmentFormProps) {
  const [submitted, setSubmitted] = useState(false);
  // Errors only appear after the first submit attempt, then update live as the user fixes them.
  const errors = submitted ? validateProfile(profile) : {};

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const current = validateProfile(profile);
    if (hasErrors(current)) {
      const first = FIELD_ORDER.find((field) => current[field]);
      const el = first ? document.getElementById(`field-${first}`) : null;
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <FormSection
        id="stage"
        title="Where are you right now?"
        description="This helps us tailor your next steps."
        error={errors.stage}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {STAGE_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              name="stage"
              value={option.value}
              label={option.label}
              description={option.description}
              icon={STAGE_ICONS[option.value]}
              checked={profile.stage === option.value}
              onChange={() => onChange({ ...profile, stage: option.value })}
            />
          ))}
        </div>
      </FormSection>

      <FormSection
        id="skills"
        title="Which skills do you have?"
        description={`Pick everything you're comfortable with, even at a beginner level. Choose at least ${MIN_SKILLS}.`}
        meta={`${profile.skills.length} selected`}
        error={errors.skills}
      >
        <div className="flex flex-wrap gap-2.5">
          {SKILLS.map((skill) => (
            <ToggleChip
              key={skill}
              label={skill}
              selected={profile.skills.includes(skill)}
              onToggle={() => onChange({ ...profile, skills: toggleItem(profile.skills, skill) })}
            />
          ))}
        </div>
      </FormSection>

      <FormSection
        id="interests"
        title="What are you interested in?"
        description={`Pick the areas that excite you. Choose at least ${MIN_INTERESTS}.`}
        meta={`${profile.interests.length} selected`}
        error={errors.interests}
      >
        <div className="flex flex-wrap gap-2.5">
          {INTERESTS.map((interest) => (
            <ToggleChip
              key={interest}
              label={interest}
              selected={profile.interests.includes(interest)}
              onToggle={() =>
                onChange({ ...profile, interests: toggleItem(profile.interests, interest) })
              }
            />
          ))}
        </div>
      </FormSection>

      <Card className="p-6 sm:p-8">
        <label htmlFor="notes" className="font-display text-lg font-semibold">
          Career goal or notes <span className="text-sm font-normal text-muted-foreground">(optional)</span>
        </label>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Anything you want to remember about what you&apos;re aiming for. Notes are kept for your
          reference and aren&apos;t used in the match scores.
        </p>
        <Textarea
          id="notes"
          rows={4}
          maxLength={NOTES_MAX_LENGTH}
          value={profile.notes}
          onChange={(e) => onChange({ ...profile, notes: e.target.value })}
          placeholder="e.g. I'd like to work at a product company, but I'm unsure between data and design roles."
          className="mt-5"
        />
        <p className="mt-2 text-right text-xs text-muted-foreground">
          {profile.notes.length}/{NOTES_MAX_LENGTH}
        </p>
      </Card>

      <div className="flex flex-col items-center gap-3 pt-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          See my matches <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button type="button" variant="outline" onClick={onUseDemo} className="w-full sm:w-auto">
          Explore with sample profile
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Use your own answers or jump to a clearly labeled sample walkthrough. Nothing is sent anywhere.
        </p>
      </div>
    </form>
  );
}
