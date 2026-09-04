"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  items: string[];
  speed?: number;
  className?: string;
  reverse?: boolean;
}

export function MarqueeStrip({
  items,
  speed = 30,
  className,
  reverse = false,
}: MarqueeStripProps) {
  const reducedMotion = useReducedMotion();
  const content = [...items, ...items];

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className={cn(
          "inline-flex gap-12",
          !reducedMotion && "animate-marquee"
        )}
        style={
          reducedMotion
            ? undefined
            : {
                animationDuration: `${speed}s`,
                animationDirection: reverse ? "reverse" : "normal",
              }
        }
      >
        {content.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-12 text-sm uppercase tracking-[0.3em] text-deep-berry/60"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-dusty-rose/50" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
