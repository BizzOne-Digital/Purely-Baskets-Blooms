import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageSection } from "@/components/layout/PageSection";
import { GradientCard } from "@/components/ui/GradientCard";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";

const steps = [
  {
    step: "01",
    title: "Discover",
    description: "Browse our collections or book a consultation to share your vision and occasion.",
    accent: "rose" as const,
  },
  {
    step: "02",
    title: "Design",
    description: "Our artisans curate blooms, palettes, and packaging tailored to your preferences.",
    accent: "champagne" as const,
  },
  {
    step: "03",
    title: "Craft",
    description: "Each arrangement is hand-crafted with premium, seasonally sourced florals.",
    accent: "botanical" as const,
  },
  {
    step: "04",
    title: "Celebrate",
    description: "Delivered with care across the GTA — ready to make someone's day unforgettable.",
    accent: "berry" as const,
  },
];

export function HowItWorks() {
  return (
    <PageSection tone="plain" className="border-t border-champagne/30 py-20 md:py-28">
      <RevealOnScroll className="mb-16 text-center">
        <Eyebrow>The Process</Eyebrow>
        <DisplayHeading as="h2" size="section" className="mt-3">
          How It Works
        </DisplayHeading>
      </RevealOnScroll>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((item, i) => (
          <RevealOnScroll key={item.step} delay={i * 0.1}>
            <GradientCard accent={item.accent} className="h-full">
              <span className="font-serif text-4xl text-dusty-rose/50">{item.step}</span>
              <h3 className="mt-4 font-serif text-xl text-deep-berry">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-deep-ink/60">{item.description}</p>
            </GradientCard>
          </RevealOnScroll>
        ))}
      </div>
    </PageSection>
  );
}
