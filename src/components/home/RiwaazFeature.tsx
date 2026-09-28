import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { GradientMesh } from "@/components/animations/GradientMesh";
import { DecorativeBlobs } from "@/components/animations/DecorativeBlobs";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GradientCard } from "@/components/ui/GradientCard";

export function RiwaazFeature() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <GradientMesh variant="riwaaz" />
      <DecorativeBlobs variant="riwaaz" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <RevealOnScroll direction="left">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <GradientMesh variant="riwaaz" className="opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-br from-marigold/40 via-blush/50 to-deep-berry/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-6xl text-deep-berry/30 md:text-8xl">रिवाज़</span>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right" delay={0.1}>
          <Eyebrow variant="marigold">The Riwaaz Collection</Eyebrow>
          <DisplayHeading as="h2" size="section" className="mt-3">
            Celebrating Heritage Through Florals
          </DisplayHeading>
          <p className="mt-6 leading-relaxed text-deep-ink/70">
            Our Riwaaz collection honours the richness of South Asian celebrations — from Roka and
            Mehndi to Shagun and wedding ceremonies. Each arrangement is thoughtfully designed with
            cultural symbolism, vibrant palettes, and artisan craftsmanship.
          </p>
          <GradientCard accent="marigold" className="mt-8" hover={false}>
            <p className="text-sm italic text-deep-ink/65">
              &ldquo;Every petal carries tradition. Every palette tells a story.&rdquo;
            </p>
          </GradientCard>
          <Link href="/riwaaz" className="mt-8 inline-block">
            <Button>Explore Riwaaz</Button>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
