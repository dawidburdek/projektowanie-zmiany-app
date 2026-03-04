"use client";

import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, containerClassName, id, children, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-small font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-bg-primary border border-border text-text-primary text-small",
              "rounded-sm h-9 px-3 pr-9 appearance-none cursor-pointer",
              "focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20",
              "disabled:bg-bg-secondary disabled:text-text-muted disabled:cursor-not-allowed",
              "transition-colors duration-150",
              error && "border-error focus:border-error",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            <ChevronDown size={16} />
          </span>
        </div>
        {error && <p className="mt-1.5 text-caption text-error">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
