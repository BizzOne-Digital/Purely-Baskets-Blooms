"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsDesktop } from "@/hooks/use-media-query";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 35 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 35 });

  useEffect(() => {
    if (reducedMotion || !isDesktop) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest("a, button, [role='button'], input, textarea, select, label")
      );
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [reducedMotion, isDesktop, cursorX, cursorY]);

  if (reducedMotion || !isDesktop) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY }}
        aria-hidden
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 12,
            height: isHovering ? 48 : 12,
            x: isHovering ? -24 : -6,
            y: isHovering ? -24 : -6,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="rounded-full border border-white bg-white/20 backdrop-blur-sm"
        />
      </motion.div>
      <style jsx global>{`
        @media (min-width: 1024px) {
          body {
            cursor: none;
          }
          a,
          button,
          [role="button"],
          input,
          textarea,
          select,
          label {
            cursor: none;
          }
        }
      `}</style>
    </>
  );
}
