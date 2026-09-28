import Link from "next/link";
import type { SerializedProduct } from "@/lib/storefront";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { getDemoShopProducts } from "@/lib/shop-demo-products";

interface FeaturedProductsProps {
  products: SerializedProduct[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const items =
    products.length > 0
      ? products.slice(0, 6)
      : (getDemoShopProducts({ pageSize: 6 }) as SerializedProduct[]);

  if (items.length === 0) return null;

  return (
    <section className="border-b border-deep-ink/10 bg-pure-white py-14 md:py-18">
      <div className="mx-auto min-w-0 w-full max-w-7xl px-4 md:px-8">
        <div className="mb-10 text-center md:mb-12">
          <DisplayHeading as="h2" size="section" className="text-deep-berry">
            Featured products
          </DisplayHeading>
          <p className="mx-auto mt-3 max-w-lg text-sm text-deep-ink/65">
            From our shop — same white backdrop on every photo so your florals stay the focus.
          </p>
        </div>

        <div className="grid min-w-0 w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
          {items.map((product, i) => (
            <ProductCard key={product._id} product={product} priority={i < 3} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/shop">
            <Button variant="outline">View all →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
