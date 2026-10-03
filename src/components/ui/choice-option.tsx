import { cn } from "@/lib/utils";

interface ChoiceOptionProps {
  name: string;
  value: number;
  letter: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

/** Radio input styled as a compact answer row. Keyboard and screen-reader friendly. */
export function ChoiceOption({ name, value, letter, label, checked, onChange }: ChoiceOptionProps) {
  return (
    <label className="relative block cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <div
        className={cn(
          "flex items-start gap-3 rounded-xl border p-4 text-sm transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          checked ? "border-primary bg-primary-soft shadow-soft" : "bg-card hover:border-primary/40"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            checked ? "bg-brand-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          {letter}
        </span>
        <span className="min-w-0 break-words pt-0.5">{label}</span>
      </div>
    </label>
  );
}
