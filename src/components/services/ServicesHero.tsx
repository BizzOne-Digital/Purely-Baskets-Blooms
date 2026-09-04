import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function ServicesHero() {
  return (
    <section className="relative min-h-[520px] overflow-hidden border-b border-champagne/25 md:min-h-[580px] lg:min-h-[640px]">
      <Image
        src="/pages/services/hero.jpg"
        alt="Luxury floral basket and gift arrangement"
        fill
        priority
        className="hero-cover-image brightness-[1.03] saturate-[1.04]"
        sizes="100vw"
      />
      <div className="hero-scrim-ivory" aria-hidden />
      <div className="hero-scrim-bottom" aria-hidden />
      <div className="editorial-botanical-lines absolute inset-0 opacity-40" aria-hidden />
      <div className="editorial-fabric-swash pointer-events-none absolute -left-16 bottom-0 h-64 w-64 opacity-40" aria-hidden />

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 md:min-h-[580px] md:px-8 lg:min-h-[640px]">
        <RevealOnScroll className="max-w-xl py-16 md:py-20">
          <LotusMark className="mb-5" />
          <DisplayHeading as="h1" size="page" className="leading-[1.06]">
            Designed for Every Kind of Celebration
          </DisplayHeading>
          <p className="mt-5 max-w-md text-base leading-relaxed text-deep-ink/70 md:text-lg">
            From personal gestures to corporate milestones, every floral and gifting experience is
            created around your vision.
          </p>
          <Link href="/booking" className="mt-8 inline-block">
            <Button className="gap-2 px-8">
              <LotusMark size="sm" className="text-champagne" />
              Discuss Your Vision
            </Button>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
