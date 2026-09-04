import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { BRAND } from "@/lib/constants";
import { HOME_GALLERY } from "@/lib/home-content";

export function HomeInstagramGrid() {
  return (
    <section className="bg-[#F7F0E8] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <RevealOnScroll className="mb-10 text-center md:mb-12">
          <DisplayHeading as="h2" size="section" className="text-deep-berry">
            Follow the Beauty
          </DisplayHeading>
          <p className="mt-3 text-sm text-deep-ink/60">
            <Link
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-deep-berry"
            >
              {BRAND.instagram}
            </Link>
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {HOME_GALLERY.map((src, i) => (
            <RevealOnScroll key={src} delay={i * 0.05}>
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-sm ring-1 ring-champagne/30">
                <Image
                  src={src}
                  alt={`Floral inspiration ${i + 1}`}
                  fill
                  className="object-cover brightness-[1.05] saturate-[1.06] transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
