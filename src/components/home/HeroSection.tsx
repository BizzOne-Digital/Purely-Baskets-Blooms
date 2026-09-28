import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/constants";
import { HOME_HERO_IMAGE } from "@/lib/home-content";
import { Button } from "@/components/ui/Button";
import type { SerializedSiteSettings } from "@/lib/storefront";

interface HeroSectionProps {
  settings: SerializedSiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const hero = settings.heroContent ?? {};
  const bgImage = settings.heroImages?.[0]?.url ?? HOME_HERO_IMAGE;

  const heading = hero.heading ?? "Beautiful flowers for every occasion.";
  const subheading =
    hero.subheading ??
    "Thoughtful blooms and gifts, made just for you — with custom designs at the heart of what we do.";

  return (
    <section className="relative -mt-28 w-full max-w-full overflow-hidden border-b border-deep-ink/10 bg-pure-white md:-mt-32">
      <div className="mx-auto grid min-h-[min(85vh,780px)] max-w-7xl min-w-0 items-center gap-10 px-4 pb-16 pt-28 md:grid-cols-2 md:gap-12 md:px-8 md:pb-20 md:pt-32">
        <div className="min-w-0">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-deep-ink/50">
            {BRAND.name}
          </p>
          <h1 className="font-display text-[2rem] font-semibold leading-[1.12] text-deep-berry sm:text-4xl md:text-[2.75rem] lg:text-5xl">
            {heading.replace(/\n/g, " ")}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-deep-ink/70 sm:text-base">
            {subheading}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={hero.primaryCtaHref ?? "/shop"}>
              <Button size="lg" className="w-full sm:w-auto">
                {hero.primaryCtaLabel ?? "Shop Flowers →"}
              </Button>
            </Link>
            <Link href={hero.secondaryCtaHref ?? "/booking"} className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {hero.secondaryCtaLabel ?? "Request a Custom Design"}
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-deep-ink/55">
            Advance notice recommended for custom work · GTA delivery available
          </p>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-lg md:max-w-none">
          <div className="flower-surface relative h-full w-full overflow-hidden rounded-sm shadow-lg ring-1 ring-deep-ink/10">
            <Image
              src={bgImage}
              alt="Floral arrangement by Purely Baskets and Blooms"
              fill
              priority
              className="object-contain p-2 md:p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
