"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";

interface LogoRevealProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  src?: string | null;
  priority?: boolean;
}

export function LogoReveal({
  className,
  size = "md",
  src,
  priority = false,
}: LogoRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <BrandLogo src={src} size={size} className={className} priority={priority} />;
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("inline-flex", className)}
    >
      <BrandLogo src={src} size={size} priority={priority} />
    </motion.span>
  );
}
