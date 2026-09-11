"use client";

import { useEffect } from "react";
import type { SerializedProduct } from "@/lib/storefront";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductDetails } from "@/components/shop/ProductDetails";
import { RelatedProducts } from "@/components/shop/RelatedProducts";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { GradientMesh } from "@/components/animations/GradientMesh";
import { DecorativeBlobs } from "@/components/animations/DecorativeBlobs";
import { PageSection } from "@/components/layout/PageSection";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GradientCard } from "@/components/ui/GradientCard";
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

  const categoryName =
    typeof product.category === "object" && product.category
      ? product.category.name
      : undefined;

  return (
    <>
      <section className="relative overflow-hidden border-b border-gold/15 bg-carbon py-10 md:py-14">
        <GradientMesh variant="shop" />
        <DecorativeBlobs variant="shop" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <RevealOnScroll>
            {categoryName ? <Eyebrow variant="berry">{categoryName}</Eyebrow> : null}
            <DisplayHeading as="h1" size="page" className="mt-2 text-cream" italic>
              {product.name}
            </DisplayHeading>
            {product.shortDescription ? (
              <p className="mt-4 max-w-2xl text-cream/72">{product.shortDescription}</p>
            ) : null}
          </RevealOnScroll>
        </div>
      </section>

      <PageSection tone="plain" containerClassName="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <RevealOnScroll>
            <ProductGallery
              mainImage={product.mainImage}
              gallery={product.gallery}
              productName={product.name}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <GradientCard accent="rose" className="h-full">
              <ProductDetails product={product} />
            </GradientCard>
          </RevealOnScroll>
        </div>
      </PageSection>

      {product.fullDescription ? (
        <PageSection tone="warm">
          <RevealOnScroll className="mx-auto max-w-3xl">
            <Eyebrow variant="marigold">The Details</Eyebrow>
            <DisplayHeading as="h2" size="section" className="mt-3">
              About This Piece
            </DisplayHeading>
            <div
              className="prose prose-sm prose-invert mt-6 text-cream/75"
              dangerouslySetInnerHTML={{ __html: product.fullDescription }}
            />
          </RevealOnScroll>
        </PageSection>
      ) : null}

      <PageSection tone="blush">
        <RelatedProducts products={related} />
      </PageSection>
    </>
  );
}
