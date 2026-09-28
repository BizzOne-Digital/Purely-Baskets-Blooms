import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function AboutRiwaazFeature() {
  return (
    <RevealOnScroll>
      <div className="relative mx-auto max-w-2xl rounded-2xl border border-deep-ink/10 bg-blush/30 p-8 text-center md:p-10">
        <LotusMark className="mx-auto mb-3 text-deep-berry" />
        <DisplayHeading as="h2" size="section" className="text-deep-berry">
          The Riwaaz Collection
        </DisplayHeading>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-deep-ink/75 md:text-base">
          Timeless designs inspired by culture, tradition and artistry—created to honor heritage and
          bring people closer.
        </p>
        <Link
          href="/riwaaz"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-deep-berry hover:text-plum"
        >
          Explore Riwaaz →
        </Link>
      </div>
    </RevealOnScroll>
  );
}
