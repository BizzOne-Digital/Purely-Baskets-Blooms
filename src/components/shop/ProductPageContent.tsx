"use client";

import { useEffect } from "react";
import type { SerializedProduct } from "@/lib/storefront";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductDetails } from "@/components/shop/ProductDetails";
import { RelatedProducts } from "@/components/shop/RelatedProducts";
import { PageSection } from "@/components/layout/PageSection";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";

export function ProductPageContent({
  product,
  related,
}: {
  product: SerializedProduct;
  related: SerializedProduct[];
}) {
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    addProduct({
      _id: product._id,
      slug: product.slug,
      name: product.name,
      imageUrl: product.mainImage.url,
      priceType: product.priceType,
      basePrice: product.basePrice,
    });
  }, [product, addProduct]);

  return (
    <>
      <section className="border-b border-deep-ink/10 bg-ivory py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <DisplayHeading as="h1" size="page" className="text-deep-berry">
            {product.name}
          </DisplayHeading>
          {product.shortDescription ? (
            <p className="mt-4 max-w-2xl text-deep-ink/70">{product.shortDescription}</p>
          ) : null}
        </div>
      </section>

      <PageSection tone="plain" containerClassName="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery
            mainImage={product.mainImage}
            gallery={product.gallery}
            productName={product.name}
          />
          <div className="rounded-sm border border-deep-ink/10 bg-pure-white p-6 md:p-8">
            <ProductDetails product={product} />
          </div>
        </div>
      </PageSection>

      {product.fullDescription ? (
        <PageSection tone="subtle">
          <div className="mx-auto max-w-3xl">
            <DisplayHeading as="h2" size="section" className="text-deep-berry">
              About This Piece
            </DisplayHeading>
            <div
              className="prose prose-sm mt-6"
              dangerouslySetInnerHTML={{ __html: product.fullDescription }}
            />
          </div>
        </PageSection>
      ) : null}

      {related.length > 0 ? (
        <PageSection tone="plain">
          <RelatedProducts products={related} />
        </PageSection>
      ) : null}
    </>
  );
}
