"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flower2, Gift, Leaf, Sparkles, Truck } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { HOME_HERO_IMAGE } from "@/lib/home-content";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
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
    <section className="relative -mt-28 min-h-[min(92vh,900px)] overflow-hidden md:-mt-32">
      <Image
        src={bgImage}
        alt="Luxury floral gift basket arrangement"
        fill
        priority
        className="hero-cover-image brightness-[1.1] contrast-[1.02] saturate-[1.1]"
        sizes="100vw"
      />

      <div className="hero-scrim-ivory" aria-hidden />
      <div className="hero-scrim-bottom lg:hidden" aria-hidden />

      <div className="relative mx-auto flex min-h-[min(92vh,900px)] max-w-7xl min-w-0 items-center px-4 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32">
        <div className="w-full min-w-0 max-w-xl lg:max-w-2xl">
          <motion.p
            {...fadeIn}
            transition={fadeTransition(0.1)}
            className="mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-bold uppercase tracking-[0.26em] text-deep-berry sm:text-sm"
          >
            {eyebrowParts.map((part, index) => (
              <span key={part} className="inline-flex items-center gap-2.5">
                {index > 0 ? <span className="text-marigold">•</span> : null}
                <span>{part}</span>
              </span>
            ))}
          </motion.p>

          <motion.h1
            {...fadeIn}
            transition={fadeTransition(0.2)}
            className="font-display text-[2rem] font-semibold italic leading-[1.08] text-deep-berry break-words sm:text-[2.35rem] md:text-5xl lg:text-[3.35rem] xl:text-6xl"
          >
            {headingLines.map((line, index) => (
              <span key={line} className="block">
                {line}
                {index < headingLines.length - 1 ? null : null}
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...fadeIn}
            transition={fadeTransition(0.32)}
            className="mt-5 max-w-lg text-sm leading-relaxed text-deep-ink/72 sm:mt-6 sm:text-base md:max-w-xl"
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
                  className="w-full normal-case tracking-normal sm:w-auto"
                >
                  <Leaf className="h-4 w-4 text-marigold" aria-hidden />
                  {hero.primaryCtaLabel ?? "Shop the Collection"}
                </Button>
              </Link>
            </MagneticButton>
            <Link href={hero.secondaryCtaHref ?? "/booking"} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-deep-berry/25 bg-ivory/80 normal-case tracking-normal backdrop-blur-sm hover:bg-ivory sm:w-auto"
              >
                <Sparkles className="h-4 w-4 text-deep-berry" aria-hidden />
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
                className="inline-flex items-center gap-2 text-xs text-deep-ink/65 sm:text-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-champagne/35 text-marigold">
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
              className="mt-6 text-[11px] uppercase tracking-[0.18em] text-deep-ink/45"
            >
              {trustLine}
            </motion.p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
