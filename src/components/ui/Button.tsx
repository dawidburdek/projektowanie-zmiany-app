import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent-primary text-text-inverse hover:bg-accent-hover border border-transparent",
  secondary: "bg-bg-card text-text-primary hover:bg-bg-tertiary border border-border hover:border-border-hover",
  ghost: "bg-transparent text-text-secondary hover:bg-bg-secondary hover:text-text-primary border border-transparent",
  danger: "bg-error text-text-inverse hover:opacity-90 border border-transparent",
  icon: "bg-transparent text-text-secondary hover:bg-bg-secondary hover:text-text-primary border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-7 px-3 text-xsmall",
  md: "h-9 px-4 text-small",
  lg: "h-11 px-6 text-body",
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11",
};

function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const sizeClass = variant === "icon" ? iconSizeStyles[size] : sizeStyles[size];

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-sm cursor-pointer",
        "transition-colors duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
        variantStyles[variant],
        sizeClass,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
