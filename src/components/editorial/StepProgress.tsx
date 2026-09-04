"use client";

import { cn } from "@/lib/utils";

interface StepProgressProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function StepProgress({ steps, currentStep, className }: StepProgressProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      {steps.map((label, i) => {
        const active = i === currentStep;
        const completed = i < currentStep;
        return (
          <div key={label} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {i > 0 ? (
                <div
                  className={cn(
                    "h-px flex-1",
                    completed || active ? "bg-deep-berry/50" : "bg-champagne/50"
                  )}
                />
              ) : (
                <div className="flex-1" />
              )}
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all",
                  active
                    ? "bg-deep-berry text-ivory shadow-md shadow-deep-berry/25"
                    : completed
                      ? "bg-dusty-rose/30 text-deep-berry"
                      : "border border-champagne/60 bg-ivory text-deep-ink/40"
                )}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 ? (
                <div
                  className={cn(
                    "h-px flex-1",
                    completed ? "bg-deep-berry/50" : "bg-champagne/50"
                  )}
                />
              ) : (
                <div className="flex-1" />
              )}
            </div>
            <span
              className={cn(
                "mt-2 hidden text-center text-[10px] uppercase tracking-widest sm:block",
                active ? "font-semibold text-deep-berry" : "text-deep-ink/45"
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
