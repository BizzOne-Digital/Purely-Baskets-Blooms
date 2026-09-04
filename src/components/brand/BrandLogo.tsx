"use client";

import Image from "next/image";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  src?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
}

const sizeClasses = {
  sm: "h-12 w-auto sm:h-14",
  md: "h-14 w-auto sm:h-16 md:h-[4.5rem]",
  lg: "h-20 w-auto sm:h-24 md:h-28",
};

const sizeDimensions = {
  sm: { width: 220, height: 54 },
  md: { width: 280, height: 68 },
  lg: { width: 380, height: 92 },
};

export function BrandLogo({
  src,
  size = "md",
  className,
  priority = false,
}: BrandLogoProps) {
  const logoSrc = src || BRAND.logoPath;
  const { width, height } = sizeDimensions[size];

  return (
    <Image
      src={logoSrc}
      alt={BRAND.name}
      width={width}
      height={height}
      priority={priority}
      className={cn("object-contain object-left", sizeClasses[size], className)}
    />
  );
}
