import { cn } from "@/lib/utils";

type ProgressVariant = "default" | "success" | "warning" | "error";
type ProgressSize = "sm" | "md" | "lg";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  className?: string;
}

const variantStyles: Record<ProgressVariant, string> = {
  default: "bg-accent-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

const sizeStyles: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

function ProgressBar({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel,
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1.5">
          <span className="text-xsmall text-text-muted">{Math.round(percent)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-bg-tertiary rounded-none overflow-hidden",
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full transition-all duration-300",
            variantStyles[variant]
          )}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

export { ProgressBar };
