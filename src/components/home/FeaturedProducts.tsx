import Link from "next/link";
import type { SerializedProduct } from "@/lib/storefront";
import { ProductCard } from "@/components/shop/ProductCard";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
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
    <section className="bg-[#F7F0E8] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <RevealOnScroll className="mb-10 text-center md:mb-12">
          <DisplayHeading as="h2" size="section" className="text-deep-berry">
            Featured Blooms &amp; Gifts
          </DisplayHeading>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((product, i) => (
            <RevealOnScroll key={product._id} delay={i * 0.06}>
              <ProductCard product={product} priority={i < 4} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2} className="mt-10 flex justify-center">
          <Link href="/shop">
            <Button variant="outline" className="border-deep-berry/30 bg-ivory/70 px-8">
              View All Arrangements
            </Button>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
