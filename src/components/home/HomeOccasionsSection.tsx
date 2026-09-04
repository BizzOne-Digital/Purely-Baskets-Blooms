import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { HOME_OCCASIONS } from "@/lib/home-content";

export function HomeOccasionsSection() {
  return (
    <section className="bg-ivory py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <RevealOnScroll className="mb-10 text-center md:mb-12">
          <DisplayHeading as="h2" size="section" className="text-deep-berry">
            Made for Meaningful Moments
          </DisplayHeading>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          {HOME_OCCASIONS.map((occasion, i) => (
            <RevealOnScroll key={occasion.label} delay={i * 0.06} className="text-center">
              <Link href={occasion.href} className="group block">
                <div className="relative mx-auto aspect-square w-full max-w-[132px] overflow-hidden rounded-full border-2 border-champagne/70 shadow-md shadow-blush/10 transition-transform duration-500 group-hover:scale-[1.03]">
                  <Image
                    src={occasion.image}
                    alt={occasion.label}
                    fill
                    className="object-cover brightness-[1.06] saturate-[1.08]"
                    sizes="132px"
                  />
                </div>
                <p className="mt-3 font-display text-sm font-semibold text-deep-berry md:text-base">
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
