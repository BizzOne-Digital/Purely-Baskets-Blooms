"use client";

import { cn } from "@/lib/utils";

export type GradientMeshVariant =
  | "hero"
  | "subtle"
  | "warm"
  | "berry"
  | "plum"
  | "riwaaz"
  | "coral"
  | "botanical"
  | "shop";

interface GradientMeshProps {
  className?: string;
  variant?: GradientMeshVariant;
}

const meshLayers: Record<GradientMeshVariant, string> = {
  hero: `
    radial-gradient(ellipse at 20% 30%, rgba(245, 214, 220, 0.65) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(232, 204, 149, 0.45) 0%, transparent 45%),
    radial-gradient(ellipse at 60% 80%, rgba(216, 117, 143, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 10% 90%, rgba(240, 138, 120, 0.22) 0%, transparent 40%)
  `,
  subtle: `
    radial-gradient(ellipse at 30% 20%, rgba(245, 214, 220, 0.35) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 80%, rgba(232, 204, 149, 0.25) 0%, transparent 50%)
  `,
  warm: `
    radial-gradient(ellipse at 25% 25%, rgba(240, 138, 120, 0.35) 0%, transparent 50%),
    radial-gradient(ellipse at 75% 70%, rgba(232, 174, 67, 0.3) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 50%, rgba(245, 214, 220, 0.25) 0%, transparent 60%)
  `,
  berry: `
    radial-gradient(ellipse at 20% 30%, rgba(122, 32, 72, 0.18) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 25%, rgba(216, 117, 143, 0.35) 0%, transparent 48%),
    radial-gradient(ellipse at 55% 85%, rgba(245, 214, 220, 0.3) 0%, transparent 50%)
  `,
  plum: `
    radial-gradient(ellipse at 15% 20%, rgba(72, 25, 54, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 85% 30%, rgba(122, 32, 72, 0.15) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 90%, rgba(245, 214, 220, 0.28) 0%, transparent 55%)
  `,
  riwaaz: `
    radial-gradient(ellipse at 25% 20%, rgba(232, 174, 67, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 75% 30%, rgba(122, 32, 72, 0.25) 0%, transparent 48%),
    radial-gradient(ellipse at 50% 80%, rgba(216, 117, 143, 0.2) 0%, transparent 50%)
  `,
  coral: `
    radial-gradient(ellipse at 30% 25%, rgba(240, 138, 120, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 75%, rgba(245, 214, 220, 0.35) 0%, transparent 48%)
  `,
  botanical: `
    radial-gradient(ellipse at 20% 30%, rgba(49, 89, 75, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(232, 204, 149, 0.3) 0%, transparent 45%),
    radial-gradient(ellipse at 60% 85%, rgba(245, 214, 220, 0.25) 0%, transparent 50%)
  `,
  shop: `
    radial-gradient(ellipse at 15% 25%, rgba(245, 214, 220, 0.5) 0%, transparent 52%),
    radial-gradient(ellipse at 85% 35%, rgba(216, 117, 143, 0.28) 0%, transparent 48%),
    radial-gradient(ellipse at 45% 90%, rgba(232, 204, 149, 0.22) 0%, transparent 50%)
  `,
};

export function GradientMesh({ className, variant = "hero" }: GradientMeshProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute -inset-[40%] opacity-80 blur-3xl"
        style={{ backgroundImage: meshLayers[variant] }}
      />
      <div className="grain-overlay absolute inset-0 opacity-[0.28]" />
    </div>
  );
}
