import Image from "next/image";
import Link from "next/link";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Button } from "@/components/ui/Button";

const GALLERY = [
  {
    src: "/pages/riwaaz-gallery/collection-poster.png",
    alt: "The Riwaaz Collection — Indian bridal collection by Purely Baskets & Blooms",
    title: "The Riwaaz Collection",
  },
  {
    src: "/pages/riwaaz-gallery/bangle-display.jpg",
    alt: "Bangle bouquet and floral display",
    title: "Bangle bouquets & trays",
  },
  {
    src: "/pages/riwaaz-gallery/ceremonial-tray.jpg",
    alt: "Ceremonial tray with flowers and traditional elements",
    title: "Ceremonial trays",
  },
  {
    src: "/pages/riwaaz-gallery/celebration-basket.jpg",
    alt: "Celebration gift basket with flowers and sweets",
    title: "Celebration baskets",
  },
  {
    src: "/pages/riwaaz-gallery/mehndi-gift-box.jpg",
    alt: "Mehndi gift box with henna cones and florals",
    title: "Mehndi & sweet gifting",
  },
] as const;

export function RiwaazPageContent() {
  return (
    <>
      <section className="border-b border-deep-ink/10 bg-ivory">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center md:px-8 md:py-20">
          <DisplayHeading as="h1" size="page" className="text-neutral-950">
            Introducing the Riwaaz Collection
          </DisplayHeading>
          <p className="mt-2 text-sm font-medium text-neutral-700">by Purely Baskets &amp; Blooms</p>
          <p className="mt-6 text-sm leading-relaxed text-neutral-800 md:text-base">
            Riwaaz is more than a collection — it is a celebration of our tradition, our culture,
            and the timeless beauty of rituals that connect generations.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base">
            In every Indian celebration, flowers are not just decoration; they are a symbol of
            purity, blessings, joy, and new beginnings. They carry emotion, memory, and meaning in
            every petal.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base">
            This collection is inspired by the essence of fresh floral beauty, heritage, and
            celebration, thoughtfully designed to honour tradition while embracing a modern,
            elegant touch. From bangle bouquets and floral bangles to ceremonial pieces, sweet
            gifting, potlis, and celebration baskets, each creation reflects the richness of our
            customs in a fresh and blooming way.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base">
            The Riwaaz Collection is now available, and can be fully customized to match your
            event, vision, and colours. Whether it is a wedding, mehndi, or a special family
            celebration, every detail is designed to feel personal, meaningful, and unforgettable.
          </p>
          <p className="mt-6 font-display text-base font-semibold italic text-neutral-900 md:text-lg">
            Because traditions are not just followed — they are felt, lived, and beautifully
            reimagined.
          </p>
          <Link href="/booking?service=riwaaz_collection" className="mt-8 inline-block">
            <Button size="lg">Share your vision →</Button>
          </Link>
          <Link
            href="/shop?collection=riwaaz"
            className="mt-4 block text-sm font-medium text-deep-berry underline underline-offset-4 hover:text-plum"
          >
            Shop Riwaaz in our catalog →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item) => (
            <figure
              key={item.src}
              className="overflow-hidden rounded-sm border border-deep-ink/10 bg-pure-white"
            >
              <div className="relative aspect-[4/5] w-full bg-ivory">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <figcaption className="border-t border-deep-ink/8 px-4 py-3 text-center text-sm font-medium text-neutral-900">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
