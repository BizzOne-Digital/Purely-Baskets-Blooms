"use client";

import { cn } from "@/lib/utils";

interface MarqueeBandProps {
  items: readonly string[];
  className?: string;
  speed?: "slow" | "normal";
}

export function MarqueeBand({ items, className, speed = "normal" }: MarqueeBandProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "overflow-hidden border-y border-gold/15 bg-carbon-elevated py-4",
        className
      )}
    >
      <div
        className={cn(
          "marquee-track flex w-max items-center gap-10",
          speed === "slow" ? "marquee-slow" : "marquee-normal"
        )}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex shrink-0 items-center gap-10 text-sm font-semibold uppercase tracking-[0.28em] text-cream/55"
          >
            <span className="text-gradient-gold">{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold/60" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
