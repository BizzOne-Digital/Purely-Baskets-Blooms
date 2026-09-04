import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
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
];

export function RiwaazPageHero() {
  return (
    <section className="relative overflow-hidden border-b border-champagne/20 bg-[#FFFBF5]">
      <div className="editorial-botanical-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="editorial-fabric-swash pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 opacity-40" aria-hidden />
      <div className="editorial-fabric-swash pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rotate-180 opacity-35" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-6 md:px-8 md:pb-14 md:pt-8 lg:pt-10">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <RevealOnScroll className="lg:pt-2">
            <LotusMark className="mb-5 text-marigold" />
            <DisplayHeading as="h1" size="page" className="leading-[1.05] text-deep-berry">
              The Riwaaz Collection
            </DisplayHeading>
            <p className="mt-4 font-display text-xl font-semibold text-deep-berry md:text-2xl">
              Tradition, thoughtfully reimagined.
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-deep-ink/75 md:text-lg">
              Modern floral trays, gift presentations and decorative pieces created for
              life&apos;s most meaningful traditions.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="flex justify-center lg:justify-end lg:pt-0">
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-[420px]">
              <div
                className="arch-mask bg-gradient-to-b from-champagne via-marigold/80 to-champagne p-[3px] shadow-xl shadow-blush/15"
                aria-hidden
              >
                <div className="arch-mask relative aspect-[4/5] overflow-hidden bg-ivory">
                  <Image
                    src="/pages/riwaaz-hero.jpg"
                    alt="The Riwaaz Collection — luxury floral tray presentation"
                    fill
                    priority
                    className="hero-arch-image brightness-[1.12] saturate-[1.12] contrast-[1.02]"
                    sizes="(max-width: 1024px) 90vw, 45vw"
                  />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:mt-16 lg:gap-8">
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
            <Button size="lg" className="gap-3 px-10 shadow-lg shadow-deep-berry/15">
              <LotusMark size="sm" className="text-champagne" />
              Explore the Collection
              <LotusMark size="sm" className="text-champagne" />
            </Button>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
