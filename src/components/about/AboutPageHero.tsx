import Image from "next/image";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { EditorialBackdrop } from "@/components/editorial/EditorialBackdrop";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

const stackImages = [
  { src: "/pages/about/hero-stack-1.jpg", alt: "Lush rose floral arrangement" },
  { src: "/pages/about/hero-stack-2.jpg", alt: "Luxury burgundy gift presentation" },
  { src: "/pages/about/hero-stack-3.jpg", alt: "Artisan floral workspace" },
];

export function AboutPageHero() {
  return (
    <EditorialBackdrop variant="warm" className="border-b border-champagne/25">
      <section className="relative mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <RevealOnScroll>
            <DisplayHeading as="h1" size="page" className="leading-[1.06]">
              Beauty, Made Meaningful
            </DisplayHeading>
            <p className="mt-5 max-w-md text-base leading-relaxed text-deep-ink/70 md:text-lg">
              Every arrangement begins with a story, a feeling and a reason to celebrate.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="grid grid-cols-[minmax(0,1fr)_7.5rem] gap-3 sm:grid-cols-[minmax(0,1fr)_9rem] md:gap-4 lg:grid-cols-[minmax(0,1fr)_6.5rem] xl:grid-cols-[minmax(0,1fr)_7.5rem]">
              <div className="relative">
                <div
                  className="absolute -inset-2 rounded-[2.5rem] border border-champagne/60 bg-gradient-to-br from-champagne/25 to-blush/10"
                  aria-hidden
                />
                <div className="arch-mask relative aspect-[4/5] overflow-hidden shadow-2xl shadow-blush/20 ring-1 ring-champagne/50">
                  <Image
                    src="/pages/about/hero-arch.jpg"
                    alt="Luxury floral basket and gift arrangement"
                    fill
                    priority
                    className="hero-arch-image"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                {stackImages.map((image) => (
                  <div
                    key={image.src}
                    className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg shadow-blush/15 ring-1 ring-champagne/40"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </EditorialBackdrop>
  );
}
