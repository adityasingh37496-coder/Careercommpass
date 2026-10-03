import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Your profile", "Your matches"];

export function Stepper({ current }: { current: 0 | 1 }) {
  return (
    <ol className="flex items-center justify-center gap-3 text-sm" aria-label="Progress">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex items-center gap-3" aria-current={active ? "step" : undefined}>
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                done || active ? "bg-brand-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" aria-hidden /> : i + 1}
            </span>
            <span className={cn(active ? "font-medium" : "text-muted-foreground")}>{label}</span>
            {i < STEPS.length - 1 && <span className="h-px w-8 bg-border sm:w-12" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}
