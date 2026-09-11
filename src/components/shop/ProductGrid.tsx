"use client";

import { useState } from "react";
import type { SerializedProduct } from "@/lib/storefront";
import { ProductCard } from "./ProductCard";
import { QuickView } from "./QuickView";

interface ProductGridProps {
  products: SerializedProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<SerializedProduct | null>(null);

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-xl text-gold-light">No products found</p>
        <p className="mt-2 text-sm text-cream/60">
          Try adjusting your filters or browse our full collection
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid min-w-0 w-full max-w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard
            key={product._id}
            product={product}
            onQuickView={setQuickViewProduct}
            priority={i < 4}
          />
        ))}
      </div>
      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
