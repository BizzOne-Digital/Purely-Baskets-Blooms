"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const isFirstRoute = useRef(true);

  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.1,
      smoothWheel: true,
      autoRaf: true,
      anchors: {
        offset: 120,
      },
      respectReducedMotion: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }

    lenisRef.current?.scrollTo(0, { force: true });
  }, [pathname, reducedMotion]);

  return <>{children}</>;
}
