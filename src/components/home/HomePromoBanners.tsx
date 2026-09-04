import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function HomePromoBanners() {
  return (
    <section className="space-y-0">
      <RevealOnScroll>
        <div className="relative overflow-hidden bg-plum">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-8 md:py-14">
            <div className="max-w-md text-ivory">
              <DisplayHeading as="h2" size="section" className="text-ivory">
                Gifting That Leaves an Impression
              </DisplayHeading>
              <p className="mt-4 text-sm leading-relaxed text-ivory/75 md:text-base">
                Premium corporate baskets and client gifting designed to reflect your brand with
                elegance and intention.
              </p>
              <Link href="/services" className="mt-6 inline-block">
                <Button className="bg-ivory text-deep-berry hover:bg-champagne/90">
                  Explore Corporate Gifting
                </Button>
              </Link>
            </div>
            <div className="relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/home/banner-corporate.jpg"
                alt="Corporate gifting arrangement"
                fill
                className="object-cover brightness-[1.06]"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.08}>
        <div className="relative overflow-hidden bg-[#F7F0E8]">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-8 md:py-14">
            <div className="max-w-md">
              <DisplayHeading as="h2" size="section" className="text-deep-berry">
                Florals That Transform the Moment
              </DisplayHeading>
              <p className="mt-4 text-sm leading-relaxed text-deep-ink/70 md:text-base">
                From intimate gatherings to grand celebrations, we create immersive floral
                experiences that elevate every event.
              </p>
              <Link href="/event-florals" className="mt-6 inline-block">
                <Button>Plan Your Event Florals</Button>
              </Link>
            </div>
            <div className="relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/home/banner-events.jpg"
                alt="Wedding and event florals"
                fill
                className="object-cover brightness-[1.06]"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
