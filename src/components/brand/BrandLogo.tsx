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
  sm: "h-11 w-auto sm:h-12",
  md: "h-12 w-auto sm:h-14 md:h-16",
  lg: "h-16 w-auto sm:h-20 md:h-24",
};

const sizeDimensions = {
  sm: { width: 200, height: 72 },
  md: { width: 240, height: 86 },
  lg: { width: 320, height: 115 },
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
