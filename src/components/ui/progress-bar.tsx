import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({ value, label, showValue = true, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("space-y-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{label}</span>
          {showValue && <span className="text-muted-foreground">{clamped}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-2 overflow-hidden rounded-full bg-muted"
      >
        <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
