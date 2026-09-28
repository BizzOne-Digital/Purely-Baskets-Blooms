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
      <div className={cn("min-w-0 max-w-full text-left", className)}>
        <p className="font-script break-words leading-none text-deep-ink">{BRAND.name}</p>
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
        variant === "header" && "leading-none",
        className
      )}
    >
      {BRAND.name}
    </p>
  );
}
