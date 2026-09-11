import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function HomeStorySplit() {
  return (
    <section className="grid overflow-hidden md:grid-cols-2">
      <RevealOnScroll className="bg-carbon-soft px-6 py-12 md:px-10 md:py-14 lg:px-12">
        <div className="grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_210px] md:gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="min-w-0">
            <DisplayHeading as="h2" size="section">
              Designed Around Your Story
            </DisplayHeading>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70 md:text-base">
              Every arrangement begins with your occasion, your palette and the feeling you want to
              create. We translate those details into florals and gifts that feel deeply personal.
            </p>
            <Link href="/about" className="mt-6 inline-block">
              <Button variant="outline">Our Story</Button>
            </Link>
          </div>

          <div className="flower-surface relative aspect-[4/3] w-full max-w-[240px] overflow-hidden rounded-sm shadow-lg shadow-black/40 ring-1 ring-gold/20 md:max-w-none">
            <Image
              src="/home/story.jpg"
              alt="Thoughtful floral gift presentation"
              fill
              className="object-contain p-3"
              sizes="240px"
            />
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="bg-carbon-elevated px-6 py-12 text-cream md:px-10 md:py-14 lg:px-12">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_190px] md:gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
              The Riwaaz Collection
            </p>
            <DisplayHeading as="h2" size="section" className="mt-3 text-cream">
              Tradition, Thoughtfully Reimagined
            </DisplayHeading>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75 md:text-base">
              Modern floral trays and gift presentations created for life&apos;s most meaningful
              cultural celebrations.
            </p>
            <Link href="/riwaaz" className="mt-6 inline-block">
              <Button className="gap-2">
                Explore Riwaaz
                <LotusMark size="sm" className="text-carbon" />
              </Button>
            </Link>
          </div>

          <div className="flower-surface relative mx-auto aspect-square w-full max-w-[190px] overflow-hidden rounded-full border-2 border-gold/40 shadow-xl shadow-black/40 md:mx-0 md:max-w-none">
            <Image
              src="/home/riwaaz-feature.jpg"
              alt="The Riwaaz Collection"
              fill
              className="object-contain p-3"
              sizes="220px"
            />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
