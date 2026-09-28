import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function ServicesHero() {
  return (
    <section className="w-full max-w-full overflow-x-hidden border-b border-deep-ink/10 bg-ivory">
      <div className="mx-auto min-w-0 w-full max-w-3xl px-4 py-14 text-center md:px-8 md:py-20">
        <RevealOnScroll>
          <LotusMark className="mx-auto mb-5 text-deep-berry" />
          <DisplayHeading as="h1" size="page" className="text-deep-berry">
            Designed for Every Kind of Celebration
          </DisplayHeading>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-deep-ink/70 md:text-base">
            From personal gestures to corporate milestones, every floral and gifting experience is
            created around your vision.
          </p>
          <Link href="/booking" className="mt-8 inline-block">
            <Button size="lg" className="gap-2 normal-case tracking-normal">
              <LotusMark size="sm" className="text-pure-white" />
              Discuss Your Vision
            </Button>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
