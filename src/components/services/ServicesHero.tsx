import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { HeroBackdrop } from "@/components/layout/HeroBackdrop";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function ServicesHero() {
  return (
    <section className="relative min-h-[520px] overflow-hidden border-b border-gold/15 md:min-h-[580px] lg:min-h-[640px]">
      <HeroBackdrop
        src="/pages/services/hero.jpg"
        alt="Luxury floral basket and gift arrangement"
        priority
      />
      <div className="editorial-botanical-lines absolute inset-0 z-[1] opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl items-center px-4 md:min-h-[580px] md:px-8 lg:min-h-[640px]">
        <RevealOnScroll className="max-w-xl py-16 md:py-20">
          <LotusMark className="mb-5 text-champagne" />
          <DisplayHeading as="h1" size="page" className="leading-[1.06] text-cream">
            Designed for Every Kind of Celebration
          </DisplayHeading>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/72 md:text-lg">
            From personal gestures to corporate milestones, every floral and gifting experience is
            created around your vision.
          </p>
          <Link href="/booking" className="mt-8 inline-block">
            <Button className="gap-2 px-8">
              <LotusMark size="sm" className="text-carbon" />
              Discuss Your Vision
            </Button>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
