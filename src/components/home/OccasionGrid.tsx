import Link from "next/link";
import { OCCASIONS } from "@/lib/constants";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageSection } from "@/components/layout/PageSection";
import { GradientCard } from "@/components/ui/GradientCard";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  Cake,
  Heart,
  PartyPopper,
  HeartHandshake,
  Flower2,
  Building2,
  Sparkles,
  Gift,
  type LucideIcon,
} from "lucide-react";

const occasionIcons: Record<string, LucideIcon> = {
  Birthdays: Cake,
  Anniversaries: Heart,
  Congratulations: PartyPopper,
  Sympathy: HeartHandshake,
  Weddings: Flower2,
  Corporate: Building2,
  "Cultural Celebrations": Sparkles,
  "Just Because": Gift,
};

const occasionAccents: Record<string, "rose" | "berry" | "coral" | "marigold" | "botanical" | "champagne"> = {
  Birthdays: "coral",
  Anniversaries: "rose",
  Congratulations: "marigold",
  Sympathy: "botanical",
  Weddings: "rose",
  Corporate: "berry",
  "Cultural Celebrations": "marigold",
  "Just Because": "champagne",
};

export function OccasionGrid() {
  const featured = OCCASIONS.slice(0, 8);

  return (
    <PageSection tone="blush" className="py-20 md:py-28">
      <RevealOnScroll className="mb-12 text-center">
        <Eyebrow>Shop by Occasion</Eyebrow>
        <DisplayHeading as="h2" size="section" className="mt-3">
          Every Moment Deserves Beauty
        </DisplayHeading>
      </RevealOnScroll>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {featured.map((occasion, i) => {
          const Icon = occasionIcons[occasion] ?? Flower2;
          const accent = occasionAccents[occasion] ?? "rose";
          return (
            <RevealOnScroll key={occasion} delay={i * 0.05}>
              <Link href={`/shop?occasion=${encodeURIComponent(occasion)}`}>
                <GradientCard accent={accent} className="flex flex-col items-center justify-center p-6 text-center">
                  <Icon className="mb-3 h-7 w-7 text-deep-berry transition-colors group-hover:text-dusty-rose" />
                  <span className="text-xs uppercase tracking-[0.15em] text-deep-ink/80 group-hover:text-deep-berry">
                    {occasion}
                  </span>
                </GradientCard>
              </Link>
            </RevealOnScroll>
          );
        })}
      </div>
    </PageSection>
  );
}
