"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const PETAL_COLORS = ["#F5D6DC", "#D8758F", "#F08A78", "#E8CC95", "#E8AE43"];

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotation: number;
}

function createPetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 10,
    size: 8 + Math.random() * 14,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    rotation: Math.random() * 360,
  }));
}

export function FloatingPetals({ count = 12 }: { count?: number }) {
  const reducedMotion = useReducedMotion();
  const petals = useMemo(() => createPetals(count), [count]);

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full opacity-40"
          style={{
            left: `${petal.x}%`,
            width: petal.size,
            height: petal.size * 1.4,
            backgroundColor: petal.color,
            borderRadius: "50% 0 50% 50%",
            transform: `rotate(${petal.rotation}deg)`,
          }}
          initial={{ y: "-10%", opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 0.5, 0.5, 0],
            rotate: petal.rotation + 180,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
