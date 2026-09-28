import { HOME_HERO_IMAGES } from "@/lib/home-content";
import type { SerializedSiteSettings } from "@/lib/storefront";
import { HeroSectionClient } from "@/components/home/HeroSectionClient";

interface HeroSectionProps {
  settings: SerializedSiteSettings;
}

function heroCopy(settings: SerializedSiteSettings) {
  const hero = settings.heroContent ?? {};
  const rawHeading = hero.heading ?? "Beautiful flowers for every occasion.";
  const heading =
    rawHeading.includes("Thoughtfully") || rawHeading.includes("\n")
      ? "Beautiful flowers for every occasion."
      : rawHeading.replace(/\n/g, " ");

  const rawSub = hero.subheading ?? "Thoughtful blooms and gifts, made just for you.";
  const subheading =
    rawSub.includes("customized floral") || rawSub.length > 72
      ? "Thoughtful blooms and gifts, made just for you."
      : rawSub;

  return {
    heading,
    subheading,
    primaryCtaLabel: hero.primaryCtaLabel ?? "Shop Flowers →",
    primaryCtaHref: hero.primaryCtaHref ?? "/shop",
    secondaryCtaLabel: hero.secondaryCtaLabel ?? "Request a Custom Design",
    secondaryCtaHref: hero.secondaryCtaHref ?? "/customize",
  };
}

export function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section className="relative -mt-[4.25rem] w-full max-w-full overflow-x-hidden border-b border-deep-ink/10 bg-pure-white md:-mt-24">
      <div className="relative mx-auto max-w-7xl md:min-h-[min(80vh,720px)]">
        <HeroSectionClient images={HOME_HERO_IMAGES} hero={heroCopy(settings)} />
      </div>
    </section>
  );
}
