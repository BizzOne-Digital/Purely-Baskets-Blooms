import Link from "next/link";
import { Heart, Palette, Sparkle } from "lucide-react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageSection } from "@/components/layout/PageSection";
import { GradientCard } from "@/components/ui/GradientCard";
import { GradientMesh } from "@/components/animations/GradientMesh";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function EventFloralsFeature() {
  return (
    <PageSection tone="plain" className="relative overflow-hidden py-20 md:py-28">
      <GradientMesh variant="coral" className="opacity-40" />
      <div className="relative grid items-center gap-12 lg:grid-cols-2">
        <RevealOnScroll direction="left">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-coral/40 via-blush/50 to-marigold/20">
                <GradientMesh variant="coral" className="opacity-60" />
              </div>
              <GradientCard accent="coral" hover={false} className="flex items-center gap-2 p-4">
                <Heart className="h-5 w-5 text-coral" />
                <span className="text-xs uppercase tracking-widest text-deep-ink/70">Weddings</span>
              </GradientCard>
            </div>
            <div className="space-y-4 pt-8">
              <GradientCard accent="rose" hover={false} className="flex items-center gap-2 p-4">
                <Palette className="h-5 w-5 text-dusty-rose" />
                <span className="text-xs uppercase tracking-widest text-deep-ink/70">Custom Design</span>
              </GradientCard>
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-deep-berry/25 via-coral/30 to-marigold/35">
                <GradientMesh variant="warm" className="opacity-50" />
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right" delay={0.1}>
          <Eyebrow variant="coral">Event Florals</Eyebrow>
          <DisplayHeading as="h2" size="section" className="mt-3">
            Weddings & Special Celebrations
          </DisplayHeading>
          <p className="mt-6 leading-relaxed text-deep-ink/70">
            From intimate gatherings to grand celebrations, we create immersive floral experiences
            that tell your story. Bridal bouquets, ceremony installations, reception centrepieces,
            and everything in between.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-deep-berry">
            <Sparkle className="h-4 w-4" />
            <span>Full-service floral design & coordination</span>
          </div>
          <Link href="/event-florals" className="mt-8 inline-block">
            <Button variant="coral">Plan Your Event</Button>
          </Link>
        </RevealOnScroll>
      </div>
    </PageSection>
  );
}
