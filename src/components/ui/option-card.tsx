import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  name: string;
  value: string;
  label: string;
  description: string;
  icon: ReactNode;
  checked: boolean;
  onChange: () => void;
}

/** Radio input styled as a selectable card. Keyboard and screen-reader friendly. */
export function OptionCard({ name, value, label, description, icon, checked, onChange }: OptionCardProps) {
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
          "h-full rounded-2xl border p-5 transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          checked
            ? "border-primary bg-primary-soft shadow-soft"
            : "bg-card hover:border-primary/40"
        )}
      >
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            checked ? "bg-brand-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          {icon}
        </span>
        <p className="mt-4 font-display font-semibold">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </label>
  );
}
