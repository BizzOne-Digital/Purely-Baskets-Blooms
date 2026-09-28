"use client";

import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BrandWordmarkProps {
  className?: string;
  /** Centered script title for header */
  variant?: "header" | "footer" | "compact";
}

export function BrandWordmark({ className, variant = "header" }: BrandWordmarkProps) {
  if (variant === "footer") {
    return (
      <div className={cn("text-left", className)}>
        <p className="font-script text-3xl leading-none text-deep-ink sm:text-4xl">
          {BRAND.name}
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <p
        className={cn(
          "font-script text-2xl leading-none text-deep-ink",
          className
        )}
      >
        {BRAND.name}
      </p>
    );
  }

  return (
    <p
      className={cn(
        "font-script text-deep-ink",
        "text-[1.75rem] leading-[1.1] sm:text-4xl md:text-[2.35rem] lg:text-[2.65rem]",
        variant === "header" && "max-w-[11rem] text-balance sm:max-w-none sm:whitespace-nowrap",
        className
      )}
    >
      {BRAND.name}
    </p>
  );
}
