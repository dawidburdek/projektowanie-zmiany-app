"use client";

import { cn } from "@/lib/utils";

type ToggleSize = "sm" | "md";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: ToggleSize;
  disabled?: boolean;
  label?: string;
  className?: string;
}

const trackStyles: Record<ToggleSize, string> = {
  sm: "w-8 h-4",
  md: "w-11 h-6",
};

const thumbStyles: Record<ToggleSize, string> = {
  sm: "h-3 w-3",
  md: "h-5 w-5",
};

const thumbTranslate: Record<ToggleSize, string> = {
  sm: "translate-x-4",
  md: "translate-x-5",
};

function Toggle({ checked, onChange, size = "md", disabled, label, className }: ToggleProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200",
          trackStyles[size],
          checked ? "bg-accent-primary" : "bg-bg-tertiary border border-border"
        )}
      >
        <span
          className={cn(
            "inline-block rounded-full bg-white shadow-sm transition-transform duration-200",
            thumbStyles[size],
            checked ? thumbTranslate[size] : "translate-x-0.5"
          )}
        />
      </button>
      {label && (
        <span className="text-small text-text-secondary select-none">{label}</span>
      )}
    </label>
  );
}

export { Toggle };
