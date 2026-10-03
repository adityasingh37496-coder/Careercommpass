import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "accent" | "success" | "warning" | "neutral";

const tones: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary",
  accent: "bg-accent-soft text-accent",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning",
  neutral: "bg-muted text-muted-foreground",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "primary", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
