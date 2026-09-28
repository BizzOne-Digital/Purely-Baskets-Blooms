import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { HeroBackdrop } from "@/components/layout/HeroBackdrop";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function AboutPageHero() {
  return (
    <section className="relative overflow-hidden border-b border-gold/15">
      <div className="relative min-h-[420px] md:min-h-[520px] lg:min-h-[580px]">
        <HeroBackdrop
          src="/pages/about/hero-arch.jpg"
          alt="Luxury floral basket and gift arrangement"
          priority
        />

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-7xl items-center px-4 md:min-h-[520px] md:px-8 lg:min-h-[580px]">
          <RevealOnScroll className="max-w-xl py-14 md:py-20">
            <DisplayHeading as="h1" size="page" className="leading-[1.06] text-cream">
              Beauty, Made Meaningful
            </DisplayHeading>
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream/72 md:text-lg">
              Every arrangement begins with a story, a feeling and a reason to celebrate.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
