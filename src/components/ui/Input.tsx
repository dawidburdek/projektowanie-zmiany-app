"use client";

import { forwardRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type InputVariant = "default" | "search";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: InputVariant;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, variant = "default", className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-small font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {variant === "search" && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              <Search size={16} />
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-bg-primary border border-border text-text-primary text-small",
              "placeholder:text-text-muted rounded-sm h-9",
              "focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20",
              "disabled:bg-bg-secondary disabled:text-text-muted disabled:cursor-not-allowed",
              "transition-colors duration-150",
              error && "border-error focus:border-error focus:ring-error/20",
              variant === "search" ? "pl-9 pr-3 py-2" : "px-3 py-2",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-caption text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
