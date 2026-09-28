"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium uppercase tracking-widest text-deep-ink/65"
          >
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "min-h-[120px] w-full resize-y rounded-xl border border-deep-ink/12 bg-pure-white px-4 py-3 text-sm text-deep-ink",
            "placeholder:text-deep-ink/35 transition-colors duration-200",
            "focus:border-deep-berry focus:outline-none focus:ring-2 focus:ring-deep-berry/15",
            error && "border-coral focus:border-coral focus:ring-coral/20",
            className
          )}
          {...props}
        />
        {error ? <p className="text-xs text-coral">{error}</p> : null}
        {hint && !error ? <p className="text-xs text-deep-ink/50">{hint}</p> : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
