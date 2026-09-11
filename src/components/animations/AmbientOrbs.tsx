"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface AmbientOrbsProps {
  className?: string;
}

export function AmbientOrbs({ className }: AmbientOrbsProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="ambient-orb absolute -left-20 top-[12%] h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="ambient-orb ambient-orb-delayed absolute -right-16 top-[28%] h-96 w-96 rounded-full bg-coral/8 blur-3xl" />
      <div className="ambient-orb ambient-orb-slow absolute bottom-[8%] left-[35%] h-64 w-64 rounded-full bg-dusty-rose/8 blur-3xl" />
    </div>
  );
}
