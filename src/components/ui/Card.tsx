import { cn } from "@/lib/utils";

type CardSize = "sm" | "md" | "lg";
type CardVariant = "default" | "muted" | "outline";

interface CardProps {
  size?: CardSize;
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-bg-card border border-border",
  muted: "bg-bg-secondary border border-transparent",
  outline: "bg-transparent border border-border",
};

const sizeStyles: Record<CardSize, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

function Card({ size = "md", variant = "default", hover, className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm",
        variantStyles[variant],
        sizeStyles[size],
        hover && "hover:border-border-hover hover:shadow-card transition-all duration-150 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export { Card };
