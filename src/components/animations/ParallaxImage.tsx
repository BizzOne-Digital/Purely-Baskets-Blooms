"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.2,
  width,
  height,
  priority,
  fill,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  if (reducedMotion) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {fill ? (
          <Image src={src} alt={alt} fill className="object-cover" priority={priority} />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 800}
            height={height ?? 1000}
            className="h-full w-full object-cover"
            priority={priority}
          />
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y: parallaxY }} className="h-[120%] w-full">
        {fill ? (
          <Image src={src} alt={alt} fill className="object-cover" priority={priority} />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 800}
            height={height ?? 1000}
            className="h-full w-full object-cover"
            priority={priority}
          />
        )}
      </motion.div>
    </div>
  );
}
