import type { SerializedProduct } from "@/lib/storefront";
import { ProductCard } from "./ProductCard";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

interface RelatedProductsProps {
  products: SerializedProduct[];
  title?: string;
}

export function RelatedProducts({
  products,
  title = "You May Also Love",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-20">
      <RevealOnScroll>
        <h2 className="mb-8 text-center font-serif text-2xl text-deep-berry md:text-3xl">
          {title}
        </h2>
      </RevealOnScroll>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
