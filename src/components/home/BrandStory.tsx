import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageSection } from "@/components/layout/PageSection";
import { GradientCard } from "@/components/ui/GradientCard";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BRAND } from "@/lib/constants";
import { Flower2, Heart } from "lucide-react";

export function BrandStory() {
  return (
    <>
      <PageSection tone="warm" className="py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <RevealOnScroll>
            <Eyebrow>Our Story</Eyebrow>
            <DisplayHeading as="h2" size="section" className="mt-3">
              Rooted in Artistry & Intention
            </DisplayHeading>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-base leading-relaxed text-deep-ink/70 md:text-lg">
              {BRAND.name} was born from a passion for creating moments of beauty — the kind that
              linger in memory long after the petals have faded. We believe every arrangement tells
              a story, and every gift basket carries an intention.
            </p>
          </RevealOnScroll>
        </div>
      </PageSection>

      <PageSection tone="blush" className="py-16 md:py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <RevealOnScroll direction="left">
            <GradientCard accent="rose" className="flex items-center justify-center p-12">
              <Flower2 className="h-24 w-24 text-dusty-rose/40" />
            </GradientCard>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.1}>
            <p className="text-base leading-relaxed text-deep-ink/70 md:text-lg">
              From our studio in the Greater Toronto Area, we craft florals and curated gifts that
              honour tradition while embracing contemporary elegance. Whether celebrating a cultural
              milestone or sending a simple gesture of love, we pour the same care into every creation.
            </p>
          </RevealOnScroll>
        </div>
      </PageSection>

      <PageSection tone="subtle" className="py-16 md:py-20">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <GradientCard accent="champagne" hover={false}>
            <Heart className="mx-auto mb-4 h-8 w-8 text-dusty-rose" />
            <p className="font-serif text-xl italic text-deep-berry">
              &ldquo;Thoughtfully Designed. Beautifully Celebrated.&rdquo;
            </p>
            <p className="mt-4 text-sm text-deep-ink/60">{BRAND.tagline}</p>
          </GradientCard>
        </RevealOnScroll>
      </PageSection>
    </>
  );
}
