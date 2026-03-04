"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ChipVariant = "default" | "accent" | "success" | "warning" | "error";

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<ChipVariant, string> = {
  default: "bg-bg-tertiary text-text-secondary border-border",
  accent: "bg-accent-subtle text-accent-primary border-accent-primary/20",
  success: "bg-success-subtle text-success border-success/20",
  warning: "bg-warning-subtle text-warning border-warning/20",
  error: "bg-error-subtle text-error border-error/20",
};

function Chip({ label, variant = "default", onRemove, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xsmall font-medium",
        "border rounded-sm",
        variantStyles[variant],
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="hover:opacity-70 transition-opacity duration-150 -mr-0.5"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}

export { Chip };
