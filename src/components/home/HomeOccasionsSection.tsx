import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HOME_OCCASIONS } from "@/lib/home-content";

export function HomeOccasionsSection() {
  return (
    <section className="relative w-full max-w-full overflow-hidden bg-carbon py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 editorial-botanical-lines opacity-10" aria-hidden />
      <div className="relative mx-auto min-w-0 w-full max-w-7xl px-4 md:px-8">
        <RevealOnScroll className="mb-12 md:mb-14">
          <SectionHeader
            eyebrow="Every Occasion"
            title="Made for Meaningful Moments"
            description="From intimate gatherings to grand celebrations — find florals and gifts crafted for your story."
          />
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          {HOME_OCCASIONS.map((occasion, i) => (
            <RevealOnScroll key={occasion.label} delay={i * 0.06} className="text-center">
              <Link href={occasion.href} className="group block">
                <div className="occasion-ring flower-surface relative mx-auto aspect-square w-full max-w-[132px] overflow-hidden rounded-full border-2 border-gold/30 shadow-lg shadow-black/30 transition-all duration-500 group-hover:scale-105 group-hover:border-gold/60 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                  <Image
                    src={occasion.image}
                    alt={occasion.label}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                    sizes="132px"
                  />
                </div>
                <p className="mt-3 font-display text-sm font-semibold text-cream transition-colors group-hover:text-gold-light md:text-base">
                  {occasion.label}
                </p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
