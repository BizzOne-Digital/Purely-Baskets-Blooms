import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageSection } from "@/components/layout/PageSection";
import { EventFloralsHero } from "@/components/event-florals/EventFloralsHero";
import { EventCategoryCard } from "@/components/event-florals/EventCategoryCard";
import { ProcessTimeline } from "@/components/editorial/ProcessTimeline";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Event Florals | Purely Baskets & Blooms",
  description:
    "Full-service wedding and event floral design — bouquets, installations, centrepieces, and more.",
};

const process = [
  {
    number: "1",
    title: "Share Your Vision",
    description: "Tell us about your event, style and inspiration.",
  },
  {
    number: "2",
    title: "Personalized Proposal",
    description: "We craft a custom floral concept just for you.",
  },
  {
    number: "3",
    title: "Design & Preparation",
    description: "Thoughtful design, premium blooms, flawless preparation.",
  },
  {
    number: "4",
    title: "Delivery & Styling",
    description: "On-time delivery and expert styling that brings your vision to life.",
  },
  {
    number: "5",
    title: "Celebrate Beautifully",
    description: "Enjoy a seamless, unforgettable celebration surrounded by beauty.",
  },
];

const categories = [
  { title: "Weddings", imageSrc: "/pages/events/weddings.jpg" },
  { title: "Showers", imageSrc: "/pages/events/showers.jpg" },
  { title: "Corporate Events", imageSrc: "/pages/events/corporate.jpg" },
  { title: "Cultural Celebrations", imageSrc: "/pages/events/cultural.jpg" },
];

export default function EventFloralsPage() {
  return (
    <>
      <EventFloralsHero />

      <PageSection tone="plain" id="process" containerClassName="py-14 md:py-20">
        <ProcessTimeline steps={process} />
      </PageSection>

      <PageSection tone="subtle" containerClassName="py-14 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {categories.map((cat, i) => (
            <RevealOnScroll key={cat.title} delay={i * 0.08}>
              <EventCategoryCard title={cat.title} imageSrc={cat.imageSrc} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2} className="mt-14 text-center">
          <Link href="/booking?service=wedding_event">
            <Button size="lg">Start Planning Your Event</Button>
          </Link>
        </RevealOnScroll>
      </PageSection>
    </>
  );
}
