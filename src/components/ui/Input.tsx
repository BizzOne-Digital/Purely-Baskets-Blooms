"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium uppercase tracking-widest text-cream/70"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border border-gold/25 bg-carbon px-4 py-3 text-sm text-cream",
            "placeholder:text-cream/40 backdrop-blur-sm transition-colors duration-200",
            "focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20",
            error && "border-coral focus:border-coral focus:ring-coral/20",
            className
          )}
          {...props}
        />
        {error ? <p className="text-xs text-coral">{error}</p> : null}
        {hint && !error ? <p className="text-xs text-cream/50">{hint}</p> : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
