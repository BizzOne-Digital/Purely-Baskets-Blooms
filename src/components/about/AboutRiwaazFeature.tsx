import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function AboutRiwaazFeature() {
  return (
    <RevealOnScroll>
      <div className="relative mx-auto max-w-5xl">
        <div
          className="absolute -inset-3 rounded-[2.5rem] border border-champagne/50 bg-gradient-to-br from-champagne/15 to-blush/10"
          aria-hidden
        />
        <div className="relative overflow-hidden rounded-3xl">
          <div className="relative aspect-[16/10] md:aspect-[21/10]">
            <Image
              src="/pages/about/riwaaz.jpg"
              alt="The Riwaaz Collection — traditional floral tray presentation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/30 via-transparent to-ivory/10" />
          </div>

          <div className="absolute bottom-4 right-4 max-w-sm rounded-2xl bg-deep-berry p-6 shadow-2xl shadow-plum/30 md:bottom-8 md:right-8 md:p-8">
            <LotusMark className="mb-3 text-champagne" />
            <DisplayHeading as="h2" size="card" className="text-ivory">
              The Riwaaz Collection
            </DisplayHeading>
            <p className="mt-3 text-sm leading-relaxed text-ivory/80">
              Timeless designs inspired by culture, tradition and artistry—created to honor
              heritage and bring people closer.
            </p>
            <Link
              href="/riwaaz"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-champagne hover:text-ivory"
            >
              Explore Riwaaz →
            </Link>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
