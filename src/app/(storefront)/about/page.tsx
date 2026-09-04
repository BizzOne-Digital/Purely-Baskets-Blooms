import { BRAND } from "@/lib/constants";
import { getPublicSiteSettings } from "@/lib/storefront";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageSection } from "@/components/layout/PageSection";
import { AboutPageHero } from "@/components/about/AboutPageHero";
import { AboutOfferingCard } from "@/components/about/AboutOfferingCard";
import { AboutRiwaazFeature } from "@/components/about/AboutRiwaazFeature";
import { LotusMark } from "@/components/editorial/LotusMark";
import { GradientCard } from "@/components/ui/GradientCard";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Flower2, HandHeart, Sparkles } from "lucide-react";

export const metadata = {
  title: `About | ${BRAND.name}`,
  description: `Learn about ${BRAND.name} — artisan florals and gift baskets in the GTA.`,
};

const values = [
  {
    icon: Sparkles,
    title: "Creativity",
    description: "Every arrangement is an original composition shaped by your story.",
  },
  {
    icon: HandHeart,
    title: "Care",
    description: "From first conversation to final delivery, we treat every detail with intention.",
  },
  {
    icon: Flower2,
    title: "Purpose",
    description: "We design for meaning — celebrations, milestones, and moments that matter.",
  },
];

const offerings = [
  {
    title: "Custom Floral Arrangements",
    description: "Bespoke designs crafted with seasonal blooms and thoughtful detail.",
    imageSrc: "/pages/about/offering-1.jpg",
    href: "/services",
  },
  {
    title: "Corporate Gifting",
    description: "Meaningful gifts that strengthen relationships and leave a lasting impression.",
    imageSrc: "/pages/about/offering-2.jpg",
    href: "/services",
  },
  {
    title: "Subscriptions",
    description: "Fresh blooms, delivered regularly to brighten everyday moments.",
    imageSrc: "/pages/about/offering-3.jpg",
    href: "/services",
  },
  {
    title: "Events & Celebrations",
    description: "Elegant floral experiences that transform your most cherished occasions.",
    imageSrc: "/pages/about/offering-4.jpg",
    href: "/event-florals",
  },
];

export default async function AboutPage() {
  const settings = await getPublicSiteSettings();
  const aboutSnippet =
    settings.footerContent?.aboutSnippet ??
    "We craft thoughtful floral arrangements and gift baskets that celebrate life's most meaningful moments.";

  return (
    <>
      <AboutPageHero />

      <PageSection tone="subtle">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll>
            <LotusMark className="mb-4" />
            <DisplayHeading as="h2" size="section">
              Thoughtfully Created, Personally Yours
            </DisplayHeading>
            <p className="mt-5 text-base leading-relaxed text-deep-ink/70">{aboutSnippet}</p>
            <p className="mt-4 text-base leading-relaxed text-deep-ink/70">
              Based in the Greater Toronto Area, we serve clients across{" "}
              {settings.deliveryAreaText ?? BRAND.deliveryArea} with handcrafted arrangements,
              curated gift baskets, and full-service event florals.
            </p>
          </RevealOnScroll>

          <div className="grid gap-4 sm:grid-cols-3">
            {values.map((value, i) => (
              <RevealOnScroll key={value.title} delay={i * 0.08}>
                <GradientCard accent="rose" className="h-full text-center">
                  <value.icon className="mx-auto mb-3 h-7 w-7 text-marigold" />
                  <h3 className="font-display text-lg font-semibold text-deep-berry">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-deep-ink/60">
                    {value.description}
                  </p>
                </GradientCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection tone="warm">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {offerings.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 0.08}>
              <AboutOfferingCard
                title={item.title}
                description={item.description}
                imageSrc={item.imageSrc}
                href={item.href}
                icon={i === 0 ? Flower2 : i === 1 ? Sparkles : i === 2 ? HandHeart : Flower2}
              />
            </RevealOnScroll>
          ))}
        </div>
      </PageSection>

      <PageSection tone="blush" containerClassName="py-16 md:py-24">
        <AboutRiwaazFeature />
      </PageSection>
    </>
  );
}
