import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { HeroBackdrop } from "@/components/layout/HeroBackdrop";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Flower2 } from "lucide-react";

export function EventFloralsHero() {
  return (
    <section className="relative min-h-[520px] overflow-hidden border-b border-gold/15 md:min-h-[600px] lg:min-h-[680px]">
      <HeroBackdrop
        src="/pages/events/hero.jpg"
        alt="Grand event floral installation with arches and candles"
        priority
      />
      <div className="editorial-botanical-lines absolute inset-0 z-[1] opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl items-center px-4 md:min-h-[600px] md:px-8 lg:min-h-[680px]">
        <RevealOnScroll className="max-w-xl py-16 md:py-20">
          <DisplayHeading as="h1" size="page" className="leading-[1.06] text-cream">
            Florals That Transform the Moment
          </DisplayHeading>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 max-w-[4.5rem] bg-gradient-to-r from-transparent to-gold/60" />
            <LotusMark size="sm" className="text-champagne" />
            <div className="h-px flex-1 max-w-[4.5rem] bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          <p className="max-w-md text-base leading-relaxed text-cream/72 md:text-lg">
            Bespoke floral styling for weddings, showers, milestones and unforgettable
            celebrations.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/booking?service=wedding_event">
              <Button className="gap-2">
                <Flower2 className="h-4 w-4" />
                Plan Your Event
              </Button>
            </Link>
            <a href="#process">
              <Button variant="outline" className="gap-2">
                <LotusMark size="sm" className="text-champagne" />
                View Our Process
              </Button>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
