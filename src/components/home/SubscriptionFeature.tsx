import Link from "next/link";
import { Calendar, Flower2, Sparkles } from "lucide-react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageSection } from "@/components/layout/PageSection";
import { GradientCard } from "@/components/ui/GradientCard";
import { GradientMesh } from "@/components/animations/GradientMesh";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";

const perks = [
  { icon: Calendar, text: "Weekly, bi-weekly, or monthly deliveries" },
  { icon: Flower2, text: "Seasonal, locally-sourced blooms" },
  { icon: Sparkles, text: "Flexible plans for home or office" },
];

export function SubscriptionFeature() {
  return (
    <PageSection tone="plain" className="relative py-20 md:py-28">
      <GradientMesh variant="botanical" className="opacity-50" />
      <div className="relative grid items-center gap-12 md:grid-cols-2">
        <RevealOnScroll>
          <Eyebrow variant="botanical">Subscriptions</Eyebrow>
          <DisplayHeading as="h2" size="section" className="mt-3">
            Fresh Blooms, Delivered Regularly
          </DisplayHeading>
          <p className="mt-6 leading-relaxed text-deep-ink/70">
            Bring the beauty of fresh florals into your space with our flexible subscription
            service. Perfect for homes, offices, and hospitality — each delivery is a curated
            celebration of the season.
          </p>
          <ul className="mt-8 space-y-4">
            {perks.map((perk) => (
              <li key={perk.text} className="flex items-center gap-3 text-sm text-deep-ink/70">
                <perk.icon className="h-4 w-4 shrink-0 text-botanical" />
                {perk.text}
              </li>
            ))}
          </ul>
          <Link href="/booking?service=floral_subscription" className="mt-8 inline-block">
            <Button>Start a Subscription</Button>
          </Link>
        </RevealOnScroll>

        <RevealOnScroll direction="right" delay={0.15}>
          <GradientCard accent="botanical" className="relative aspect-square overflow-hidden">
            <GradientMesh variant="botanical" className="opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-botanical/20 via-champagne/30 to-blush/40">
              <Flower2 className="h-32 w-32 text-botanical/40" />
            </div>
          </GradientCard>
        </RevealOnScroll>
      </div>
    </PageSection>
  );
}
