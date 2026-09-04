import Link from "next/link";
import { Building2, Gift, Users } from "lucide-react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { GradientMesh } from "@/components/animations/GradientMesh";
import { DecorativeBlobs } from "@/components/animations/DecorativeBlobs";
import { GradientCard } from "@/components/ui/GradientCard";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";

const features = [
  {
    icon: Building2,
    title: "Corporate Gifting",
    description:
      "Elevate your brand with bespoke gift baskets and floral arrangements for clients, teams, and events.",
    accent: "berry" as const,
  },
  {
    icon: Users,
    title: "Volume Orders",
    description:
      "Dedicated support for large-scale orders with custom branding, packaging, and delivery coordination.",
    accent: "champagne" as const,
  },
  {
    icon: Gift,
    title: "Curated Experiences",
    description:
      "From welcome kits to milestone celebrations — thoughtfully designed gifts that leave a lasting impression.",
    accent: "rose" as const,
  },
];

export function CorporateFeature() {
  return (
    <section className="relative overflow-hidden border-y border-champagne/30 py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-plum via-deep-berry/90 to-plum" />
      <GradientMesh variant="plum" className="opacity-40" />
      <DecorativeBlobs variant="berry" />
      <div className="relative mx-auto max-w-7xl px-4 text-ivory md:px-8">
        <RevealOnScroll className="mb-16 text-center">
          <Eyebrow variant="champagne">For Business</Eyebrow>
          <DisplayHeading as="h2" size="section" className="mt-3 text-ivory">
            Corporate Gifting & Events
          </DisplayHeading>
          <p className="mx-auto mt-4 max-w-2xl text-ivory/60">
            Partner with us for premium corporate florals and gift solutions tailored to your brand
            and budget.
          </p>
        </RevealOnScroll>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <RevealOnScroll key={feature.title} delay={i * 0.1}>
              <GradientCard accent={feature.accent} className="h-full border-ivory/10 bg-ivory/5 backdrop-blur-sm">
                <feature.icon className="mb-4 h-8 w-8 text-champagne" />
                <h3 className="font-serif text-xl text-ivory">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/60">{feature.description}</p>
              </GradientCard>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/services">
            <Button variant="outline" className="border-ivory/30 text-ivory hover:bg-ivory/10">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
