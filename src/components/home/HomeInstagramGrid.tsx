import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BRAND } from "@/lib/constants";
import { HOME_GALLERY } from "@/lib/home-content";

export function HomeInstagramGrid() {
  return (
    <section className="w-full max-w-full overflow-hidden bg-carbon py-16 md:py-24">
      <div className="mx-auto min-w-0 w-full max-w-7xl px-4 md:px-8">
        <RevealOnScroll className="mb-12 md:mb-14">
          <SectionHeader
            eyebrow="On Instagram"
            title="Follow the Beauty"
            description={
              <>
                Daily inspiration, behind-the-scenes moments and new collections on{" "}
                <Link
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-light underline underline-offset-4 transition-colors hover:text-gold"
                >
                  {BRAND.instagram}
                </Link>
              </>
            }
          />
        </RevealOnScroll>

        <div className="grid min-w-0 w-full grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {HOME_GALLERY.map((src, i) => (
            <RevealOnScroll key={src} delay={i * 0.06}>
              <Link
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="flower-surface card-shine relative aspect-square overflow-hidden rounded-sm shadow-lg shadow-black/30 ring-1 ring-gold/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:ring-gold/40 group-hover:shadow-[0_16px_40px_rgba(201,168,76,0.12)]">
                  <Image
                    src={src}
                    alt={`Floral inspiration ${i + 1}`}
                    fill
                    className="object-contain p-3 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
