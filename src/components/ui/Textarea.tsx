"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-bg-primary border border-border text-text-primary text-small",
            "placeholder:text-text-muted rounded-sm resize-y min-h-[80px]",
            "px-3 py-2",
            "focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20",
            "disabled:bg-bg-secondary disabled:text-text-muted disabled:cursor-not-allowed",
            "transition-colors duration-150",
            error && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-caption text-error">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
