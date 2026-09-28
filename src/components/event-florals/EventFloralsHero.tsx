import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Flower2 } from "lucide-react";

export function EventFloralsHero() {
  return (
    <section className="w-full max-w-full overflow-x-hidden border-b border-deep-ink/10 bg-ivory">
      <div className="mx-auto min-w-0 w-full max-w-3xl px-4 py-14 text-center md:px-8 md:py-20">
        <RevealOnScroll>
          <DisplayHeading as="h1" size="page" className="text-deep-berry">
            Florals That Transform the Moment
          </DisplayHeading>

          <div className="my-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-deep-ink/15" />
            <LotusMark size="sm" className="text-deep-berry" />
            <div className="h-px w-12 bg-deep-ink/15" />
          </div>

          <p className="mx-auto max-w-lg text-sm leading-relaxed text-deep-ink/70 md:text-base">
            Bespoke floral styling for weddings, showers, milestones and unforgettable
            celebrations.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <Link href="/booking?service=wedding_event" className="block sm:inline-block">
              <Button size="lg" className="w-full gap-2 normal-case tracking-normal sm:w-auto">
                <Flower2 className="h-4 w-4" />
                Plan Your Event
              </Button>
            </Link>
            <a href="#process" className="block sm:inline-block">
              <Button
                size="lg"
                variant="outline"
                className="w-full gap-2 normal-case tracking-normal sm:w-auto"
              >
                View Our Process
              </Button>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
