import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageSection } from "@/components/layout/PageSection";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceAlternatingRow } from "@/components/services/ServiceAlternatingRow";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Services | Purely Baskets & Blooms",
  description: "Custom florals, corporate gifting, subscriptions, Riwaaz collection, and event design.",
};

const services = [
  {
    number: "01",
    title: "Custom Floral Arrangements",
    description: "Bespoke designs crafted with seasonal blooms and thoughtful detail.",
    imageSrc: "/pages/services/01-custom-floral.jpg",
  },
  {
    number: "02",
    title: "Corporate Gifting",
    description: "Meaningful gifts that strengthen relationships and leave a lasting impression.",
    imageSrc: "/pages/services/02-corporate.jpg",
  },
  {
    number: "03",
    title: "Floral Subscriptions",
    description: "Fresh blooms, delivered regularly to brighten everyday moments.",
    imageSrc: "/pages/services/03-subscriptions.jpg",
  },
  {
    number: "04",
    title: "The Riwaaz Collection",
    description: "Timeless keepsakes inspired by culture, tradition, and artistry.",
    imageSrc: "/pages/services/04-riwaaz.jpg",
  },
  {
    number: "05",
    title: "Weddings & Special Events",
    description: "Elegant floral experiences that transform your most cherished occasions.",
    imageSrc: "/pages/services/05-weddings.jpg",
  },
];

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />

      <PageSection tone="plain" containerClassName="py-10 md:py-16">
        <RevealOnScroll className="mb-12 md:mb-16">
          <SectionHeader
            eyebrow="What We Offer"
            title="Our Services"
            description="From bespoke florals to corporate gifting and full event design — every experience is tailored to your vision."
            align="center"
          />
        </RevealOnScroll>

        {services.map((service, i) => (
          <ServiceAlternatingRow
            key={service.number}
            number={service.number}
            title={service.title}
            description={service.description}
            imageSrc={service.imageSrc}
            reverse={i % 2 === 1}
            showWave={i > 0}
          />
        ))}

        <div className="mt-16 text-center">
          <Link href="/booking">
            <Button size="lg">Book a Consultation</Button>
          </Link>
        </div>
      </PageSection>
    </>
  );
}
