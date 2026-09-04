import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Flower2 } from "lucide-react";

export function EventFloralsHero() {
  return (
    <section className="relative min-h-[520px] overflow-hidden border-b border-champagne/25 md:min-h-[600px] lg:min-h-[680px]">
      <Image
        src="/pages/events/hero.jpg"
        alt="Grand event floral installation with arches and candles"
        fill
        priority
        className="hero-cover-image brightness-[1.02] saturate-[1.04]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/92 via-ivory/55 to-ivory/10 md:via-ivory/45 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory/25 via-transparent to-ivory/15" />
      <div className="editorial-botanical-lines absolute inset-0 opacity-35" aria-hidden />

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 md:min-h-[600px] md:px-8 lg:min-h-[680px]">
        <RevealOnScroll className="max-w-xl py-16 md:py-20">
          <DisplayHeading as="h1" size="page" className="leading-[1.06]">
            Florals That Transform the Moment
          </DisplayHeading>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 max-w-[4.5rem] bg-gradient-to-r from-transparent to-champagne/80" />
            <LotusMark size="sm" className="text-marigold" />
            <div className="h-px flex-1 max-w-[4.5rem] bg-gradient-to-l from-transparent to-champagne/80" />
          </div>

          <p className="max-w-md text-base leading-relaxed text-deep-ink/70 md:text-lg">
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
              <Button variant="outline" className="gap-2 border-deep-berry/30 bg-ivory/50">
                <LotusMark size="sm" className="text-marigold" />
                View Our Process
              </Button>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
