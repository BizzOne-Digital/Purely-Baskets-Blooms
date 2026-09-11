import Link from "next/link";
import type { SerializedProduct } from "@/lib/storefront";
import { ProductCard } from "@/components/shop/ProductCard";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDemoShopProducts } from "@/lib/shop-demo-products";

interface FeaturedProductsProps {
  products: SerializedProduct[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const items =
    products.length > 0
      ? products.slice(0, 4)
      : (getDemoShopProducts({ pageSize: 4 }) as SerializedProduct[]);

  if (items.length === 0) return null;

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-carbon-soft py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 editorial-botanical-lines opacity-15" aria-hidden />
      <div className="relative mx-auto min-w-0 w-full max-w-7xl px-4 md:px-8">
        <RevealOnScroll className="mb-12 md:mb-14">
          <SectionHeader
            eyebrow="Curated For You"
            title="Featured Blooms & Gifts"
            description="Hand-selected arrangements and gift experiences — each one designed to feel personal, polished and unforgettable."
          />
        </RevealOnScroll>

        <div className="grid min-w-0 w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
          {items.map((product, i) => (
            <RevealOnScroll key={product._id} delay={i * 0.08}>
              <ProductCard product={product} priority={i < 4} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.25} className="mt-12 flex justify-center">
          <Link href="/shop">
            <Button variant="outline" className="btn-glow-outline px-10">
              View All Arrangements
            </Button>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
