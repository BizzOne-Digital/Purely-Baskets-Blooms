import Link from "next/link";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Button } from "@/components/ui/Button";
import { RiwaazCategoryCard } from "@/components/riwaaz/RiwaazCategoryCard";

const categories = [
  {
    title: "Bangle Bouquets & Trays",
    imageSrc: "/products/ritual-bloom-tray.jpg",
    href: "/shop?collection=riwaaz",
  },
  {
    title: "Mehndi & Wedding",
    imageSrc: "/products/mehndi-celebration-tray.jpg",
    href: "/shop?collection=riwaaz",
  },
  {
    title: "Celebration Baskets",
    imageSrc: "/products/heritage-bloom-tray.jpg",
    href: "/shop?collection=riwaaz",
  },
];

export function RiwaazPageHero() {
  return (
    <>
      <section className="border-b border-deep-ink/10 bg-ivory">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center md:px-8 md:py-20">
          <DisplayHeading as="h1" size="page" className="text-deep-berry">
            The Riwaaz Collection
          </DisplayHeading>
          <p className="mt-6 text-sm leading-relaxed text-deep-ink/75 md:text-base">
            Riwaaz means tradition — and every culture, family, and individual has traditions worth
            celebrating. This collection honours them through meaningful, beautifully customized
            creations. Whatever your culture or tradition, we can customize something special for
            your celebration.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-deep-ink/70">
            In every Indian celebration, flowers symbolize purity, blessings, joy, and new
            beginnings. Products include bangle bouquets, sweets trays, potlis, and celebration
            baskets — fully tailored to your event, vision, and colours.
          </p>
          <Link href="/booking" className="mt-8 inline-block">
            <Button size="lg">Share your vision →</Button>
          </Link>
        </div>
      </section>

      <div className="mx-auto min-w-0 w-full max-w-7xl px-4 py-12 md:px-8 md:py-14">
        <div className="grid min-w-0 w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <RiwaazCategoryCard
              key={cat.title}
              title={cat.title}
              imageSrc={cat.imageSrc}
              href={cat.href}
            />
          ))}
        </div>
      </div>
    </>
  );
}
