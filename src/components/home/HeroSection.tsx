"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Flower2, Gift, Leaf, Sparkles, Truck } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { HOME_HERO_IMAGE } from "@/lib/home-content";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AmbientOrbs } from "@/components/animations/AmbientOrbs";
import { HeroBackdrop } from "@/components/layout/HeroBackdrop";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { SerializedSiteSettings } from "@/lib/storefront";

interface HeroSectionProps {
  settings: SerializedSiteSettings;
}

function splitEyebrow(text: string) {
  return text.split("•").map((part) => part.trim()).filter(Boolean);
}

function splitHeading(text: string) {
  if (text.includes("\n")) {
    return text.split("\n").map((line) => line.trim()).filter(Boolean);
  }
  return text
    .split(".")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.endsWith(".") ? line : `${line}.`));
}

const trustItems = [
  { icon: Flower2, label: "Advance orders" },
  { icon: Gift, label: "Personalized designs" },
  { icon: Truck, label: "GTA delivery" },
] as const;

export function HeroSection({ settings }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const hero = settings.heroContent ?? {};
  const bgImage = settings.heroImages?.[0]?.url ?? HOME_HERO_IMAGE;

  const eyebrow =
    hero.eyebrow ?? "Bespoke Florals • Meaningful Gifts • Beautiful Celebrations";
  const heading = hero.heading ?? BRAND.tagline;
  const subheading =
    hero.subheading ??
    "Custom florals, elevated gifting and culturally inspired designs created with care for life's most meaningful moments.";
  const trustLine = hero.trustLine;

  const headingLines = splitHeading(heading);
  const eyebrowParts = splitEyebrow(eyebrow);

  const fadeIn = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
      };

  const fadeTransition = (delay: number) =>
    reducedMotion
      ? undefined
      : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section className="relative -mt-28 w-full max-w-full overflow-hidden bg-carbon md:-mt-32">
      <HeroBackdrop
        src={bgImage}
        alt=""
        priority
        imageClassName="brightness-[0.82] saturate-[1.08]"
      />
      <AmbientOrbs />
      <div className="grain-overlay absolute inset-0 z-[1] opacity-30" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[min(92vh,900px)] max-w-7xl min-w-0 items-center px-4 pb-20 pt-28 md:px-8 md:pb-24 md:pt-32">
        <div className="w-full min-w-0 max-w-2xl">
          <motion.p
            {...fadeIn}
            transition={fadeTransition(0.1)}
            className="mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-bold uppercase tracking-[0.26em] text-champagne sm:text-sm"
          >
            {eyebrowParts.map((part, index) => (
              <span key={part} className="inline-flex items-center gap-2.5">
                {index > 0 ? <span className="text-coral">•</span> : null}
                <span>{part}</span>
              </span>
            ))}
          </motion.p>

          <motion.h1
            {...fadeIn}
            transition={fadeTransition(0.2)}
            className="font-display text-[2rem] font-semibold italic leading-[1.08] break-words sm:text-[2.35rem] md:text-5xl lg:text-[3.35rem] xl:text-6xl"
          >
            {headingLines.map((line, lineIndex) => (
              <span key={line} className="block">
                {lineIndex === headingLines.length - 1 ? (
                  <span className="text-gradient-gold not-italic">{line}</span>
                ) : (
                  <span className="text-cream">{line}</span>
                )}
              </span>
            ))}
          </motion.h1>

          <motion.div
            {...fadeIn}
            transition={fadeTransition(0.26)}
            className="my-6 gold-rule max-w-xs opacity-80"
            aria-hidden
          />

          <motion.p
            {...fadeIn}
            transition={fadeTransition(0.32)}
            className="max-w-lg text-sm leading-relaxed text-cream/72 sm:text-base md:max-w-xl"
          >
            {subheading}
          </motion.p>

          <motion.div
            {...fadeIn}
            transition={fadeTransition(0.42)}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <MagneticButton>
              <Link href={hero.primaryCtaHref ?? "/shop"}>
                <Button
                  size="lg"
                  className="btn-glow w-full normal-case tracking-normal sm:w-auto"
                >
                  <Leaf className="h-4 w-4 text-carbon" aria-hidden />
                  {hero.primaryCtaLabel ?? "Shop the Collection"}
                </Button>
              </Link>
            </MagneticButton>
            <Link href={hero.secondaryCtaHref ?? "/booking"} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full normal-case tracking-normal sm:w-auto"
              >
                <Sparkles className="h-4 w-4 text-champagne" aria-hidden />
                {hero.secondaryCtaLabel ?? "Create a Custom Order"}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={fadeTransition(0.52)}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-3 sm:mt-10 sm:gap-x-8"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="trust-pill inline-flex items-center gap-2 text-xs text-cream/60 sm:text-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-carbon-elevated/80 text-gold backdrop-blur-sm">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          {trustLine ? (
            <motion.p
              {...fadeIn}
              transition={fadeTransition(0.58)}
              className="mt-6 text-[11px] uppercase tracking-[0.18em] text-cream/40"
            >
              {trustLine}
            </motion.p>
          ) : null}
        </div>
      </div>

      {!reducedMotion ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/40 md:flex"
          aria-hidden
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      ) : null}
    </section>
  );
}
