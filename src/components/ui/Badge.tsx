import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "warning" | "error" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-text-secondary text-text-inverse border-transparent",
  accent: "bg-accent-primary text-text-inverse border-transparent",
  success: "bg-success text-text-inverse border-transparent",
  warning: "bg-warning text-text-inverse border-transparent",
  error: "bg-error text-text-inverse border-transparent",
  outline: "bg-transparent text-text-secondary border-border",
};

function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xsmall font-medium rounded-sm border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export { Badge };
