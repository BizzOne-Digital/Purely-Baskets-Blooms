import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { CrownMark } from "@/components/icons/CrownMark";
import { HeroBackdrop } from "@/components/layout/HeroBackdrop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { BRAND } from "@/lib/constants";

export function ShopHeroBanner() {
  return (
    <section className="relative overflow-hidden border-b border-gold/15">
      <div className="relative min-h-[320px] md:min-h-[400px]">
        <HeroBackdrop
          src="/shop-hero.jpg"
          alt="Luxury floral arrangement with roses and eucalyptus"
          priority
        />

        <div className="relative z-10 mx-auto flex min-h-[320px] max-w-7xl items-center px-4 md:min-h-[400px] md:px-8">
          <RevealOnScroll className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60 sm:w-12" />
              <CrownMark />
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60 sm:w-12" />
            </div>

            <Eyebrow variant="champagne" className="tracking-[0.22em]">
              {BRAND.name}
            </Eyebrow>

            <DisplayHeading
              as="h1"
              size="page"
              italic
              className="mt-3 leading-[1.06] text-cream"
            >
              Flowers Made Personal
            </DisplayHeading>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/72 md:text-base">
              Explore custom florals and thoughtful gifts for every meaningful moment.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
