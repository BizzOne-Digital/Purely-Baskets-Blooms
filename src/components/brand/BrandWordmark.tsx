"use client";

import Image from "next/image";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BrandWordmarkProps {
  src?: string | null;
  className?: string;
  priority?: boolean;
  /** Larger centered treatment for the main header */
  variant?: "header" | "footer" | "compact";
}

export function BrandWordmark({
  src,
  className,
  priority = false,
  variant = "header",
}: BrandWordmarkProps) {
  const logoSrc = src || BRAND.logoPath;

  if (variant === "compact") {
    return (
      <Image
        src={logoSrc}
        alt={BRAND.name}
        width={200}
        height={72}
        priority={priority}
        className={cn("h-11 w-auto max-w-full object-contain sm:h-12", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col items-center text-center",
        variant === "footer" ? "items-start text-left" : "",
        className
      )}
    >
      <Image
        src={logoSrc}
        alt=""
        width={variant === "header" ? 280 : 240}
        height={variant === "header" ? 100 : 86}
        priority={priority}
        aria-hidden
        className={cn(
          "w-auto max-w-full object-contain",
          variant === "header"
            ? "h-14 sm:h-16 md:h-[4.5rem] lg:h-20"
            : "h-12 sm:h-14 md:h-16"
        )}
      />
      <span className="sr-only">{BRAND.name}</span>
      <p
        className={cn(
          "font-display font-semibold italic leading-none text-deep-berry",
          variant === "header"
            ? "mt-1 text-xl sm:text-2xl md:text-[1.65rem]"
            : "mt-1 text-lg sm:text-xl"
        )}
      >
        Purely
      </p>
      <p
        className={cn(
          "font-sans font-medium uppercase tracking-[0.28em] text-deep-ink/85",
          variant === "header" ? "mt-1 text-[9px] sm:text-[10px]" : "mt-0.5 text-[9px]"
        )}
      >
        Baskets &amp; Blooms
      </p>
    </div>
  );
}
