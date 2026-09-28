import Link from "next/link";
import Image from "next/image";
import { HOME_HERO_IMAGE } from "@/lib/home-content";
import { Button } from "@/components/ui/Button";
import type { SerializedSiteSettings } from "@/lib/storefront";

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
    secondaryCtaHref: hero.secondaryCtaHref ?? "/booking",
  };
}

export function HeroSection({ settings }: HeroSectionProps) {
  const hero = heroCopy(settings);
  const bgImage = settings.heroImages?.[0]?.url ?? HOME_HERO_IMAGE;

  return (
    <section className="relative -mt-[4.25rem] w-full max-w-full overflow-hidden border-b border-deep-ink/10 bg-pure-white md:-mt-24">
      <div className="relative mx-auto min-h-[min(72vh,640px)] max-w-7xl md:min-h-[min(78vh,680px)]">
        {/* Floral photo — right side, mockup style */}
        <div className="absolute inset-y-0 right-0 hidden w-[55%] md:block lg:w-[58%]">
          <div className="relative h-full w-full">
            <Image
              src={bgImage}
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="60vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pure-white via-pure-white/85 to-transparent"
              aria-hidden
            />
          </div>
        </div>

        <div className="relative z-10 flex min-h-[min(72vh,640px)] flex-col px-4 pb-10 pt-[5.5rem] md:min-h-[min(78vh,680px)] md:max-w-[46%] md:justify-start md:pb-14 md:pl-8 md:pr-4 md:pt-[6.75rem] lg:pt-28">
          <h1 className="font-display text-[1.85rem] font-semibold leading-[1.15] text-deep-berry sm:text-4xl md:text-[2.65rem] lg:text-[2.85rem]">
            {hero.heading}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-deep-ink/65 md:mt-5 md:text-lg">
            {hero.subheading}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-8">
            <Link href={hero.primaryCtaHref}>
              <Button size="lg" className="w-full min-w-[11rem] sm:w-auto">
                {hero.primaryCtaLabel}
              </Button>
            </Link>
            <Link href={hero.secondaryCtaHref} className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {hero.secondaryCtaLabel}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile hero image below text */}
        <div className="relative mx-4 mb-8 aspect-[4/3] overflow-hidden rounded-sm md:hidden">
          <Image
            src={bgImage}
            alt="Floral arrangement"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
