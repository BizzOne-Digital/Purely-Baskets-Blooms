import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { HeroBackdrop } from "@/components/layout/HeroBackdrop";
import { RiwaazCategoryCard } from "@/components/riwaaz/RiwaazCategoryCard";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

const categories = [
  {
    title: "Roka & Shagun",
    imageSrc: "/pages/riwaaz-roka-shagun.jpg",
    href: "/shop?collection=riwaaz",
  },
  {
    title: "Mehndi Celebrations",
    imageSrc: "/pages/riwaaz-mehndi.jpg",
    href: "/shop?collection=riwaaz",
  },
  {
    title: "Wedding Gifting",
    imageSrc: "/pages/riwaaz-wedding.jpg",
    href: "/shop?collection=riwaaz",
  },
  {
    title: "Luxury Gift Baskets",
    imageSrc: "/pages/riwaaz-gift-basket.jpg",
    href: "/shop?collection=riwaaz",
  },
  {
    title: "Shagun & Sweets",
    imageSrc: "/pages/riwaaz-mithai.jpg",
    href: "/shop?collection=riwaaz",
  },
];

export function RiwaazPageHero() {
  return (
    <section className="relative w-full max-w-full overflow-hidden border-b border-gold/15">
      <div className="relative min-h-[480px] md:min-h-[560px]">
        <HeroBackdrop
          src="/pages/riwaaz-hero.jpg"
          alt="The Riwaaz Collection — luxury floral tray presentation"
          priority
        />
        <div className="editorial-botanical-lines pointer-events-none absolute inset-0 z-[1] opacity-15" aria-hidden />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-14 md:px-8 md:pb-14 md:pt-20">
          <RevealOnScroll className="max-w-xl">
            <LotusMark className="mb-5 text-champagne" />
            <DisplayHeading as="h1" size="page" className="leading-[1.05] text-cream">
              The Riwaaz Collection
            </DisplayHeading>
            <p className="mt-4 font-display text-xl font-semibold text-gold-light md:text-2xl">
              Tradition, thoughtfully reimagined.
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/72 md:text-lg">
              Modern floral trays, gift presentations and decorative pieces created for
              life&apos;s most meaningful traditions.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      <div className="relative bg-carbon">
        <div className="mx-auto min-w-0 w-full max-w-7xl px-4 pb-14 pt-12 md:px-8 md:pb-16 md:pt-14">
          <div className="grid min-w-0 w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8">
            {categories.map((cat, i) => (
              <RevealOnScroll key={cat.title} delay={0.12 + i * 0.08}>
                <RiwaazCategoryCard
                  title={cat.title}
                  imageSrc={cat.imageSrc}
                  href={cat.href}
                />
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.35} className="mt-14 flex justify-center md:mt-16">
            <Link href="/shop?collection=riwaaz">
              <Button size="lg" className="gap-3 px-10">
                <LotusMark size="sm" className="text-carbon" />
                Explore the Collection
                <LotusMark size="sm" className="text-carbon" />
              </Button>
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
