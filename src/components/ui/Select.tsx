"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label ? (
          <label
            htmlFor={selectId}
            className="block text-xs font-medium uppercase tracking-widest text-cream/70"
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none rounded-xl border border-gold/25 bg-carbon px-4 py-3 pr-10 text-sm text-cream",
              "backdrop-blur-sm transition-colors duration-200",
              "focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20",
              error && "border-coral focus:border-coral focus:ring-coral/20",
              className
            )}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-deep-ink/40" />
        </div>
        {error ? <p className="text-xs text-coral">{error}</p> : null}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
