import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToggleChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function ToggleChip({ label, selected, onToggle }: ToggleChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-soft"
          : "bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
      )}
    >
      {selected && <Check className="h-3.5 w-3.5" aria-hidden />}
      {label}
    </button>
  );
}
