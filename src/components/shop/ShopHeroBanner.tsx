import Image from "next/image";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function ShopHeroBanner() {
  return (
    <section className="border-b border-deep-ink/10 bg-ivory">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-8 md:py-16">
        <div>
          <DisplayHeading as="h1" size="page" className="text-deep-berry">
            Shop Flowers &amp; Gifts
          </DisplayHeading>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-deep-ink/70 md:text-base">
            Curated from our live collection — birthday, sympathy, corporate, and the Riwaaz
            Collection. Every product photo uses the same clean white backdrop so the florals stand
            out.
          </p>
        </div>
        <div className="flower-surface relative aspect-[16/10] overflow-hidden rounded-sm shadow-md ring-1 ring-deep-ink/10">
          <Image
            src="/shop-hero.jpg"
            alt="Shop floral collection"
            fill
            priority
            className="object-contain p-3"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
