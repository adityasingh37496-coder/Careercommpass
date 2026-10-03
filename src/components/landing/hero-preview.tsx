import { CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SAMPLE_MATCHES, SAMPLE_SKILLS } from "@/data/landing";

/** Static product mock used in the hero. Not real recommendations. */
export function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-brand-gradient opacity-15 blur-2xl" aria-hidden />

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            Your career matches
          </div>
          <Badge tone="neutral">Sample</Badge>
        </div>

        <div className="mt-5 space-y-4">
          {SAMPLE_MATCHES.map((m) => (
            <ProgressBar key={m.role} label={m.role} value={m.score} />
          ))}
        </div>

        <div className="mt-6 border-t pt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Skills detected
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SAMPLE_SKILLS.map((s) => (
              <Badge key={s} tone="accent">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Card className="absolute -bottom-6 -left-4 hidden w-60 p-4 sm:block">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium">Next step</p>
            <p className="text-xs text-muted-foreground">Build one SQL project for your portfolio.</p>
          </div>
        </div>
      </Card>

      <Card className="absolute -right-3 -top-5 hidden w-44 p-3.5 sm:block">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
            <TrendingUp className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Top match</p>
            <p className="text-sm font-semibold">92% fit</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
