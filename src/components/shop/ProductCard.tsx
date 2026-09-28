"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SerializedProduct } from "@/lib/storefront";
import { PriceDisplay } from "./PriceDisplay";
import { Badge } from "@/components/ui/Badge";
import { isSaleActive } from "@/lib/utils";
import { resolveImageSrc } from "@/lib/image-url";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: SerializedProduct;
  onQuickView?: (product: SerializedProduct) => void;
  priority?: boolean;
}

export function ProductCard({ product, onQuickView, priority }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const onSale = isSaleActive(product.salePrice, product.saleStartDate, product.saleEndDate);
  const galleryImage = product.gallery?.[0]?.url
    ? resolveImageSrc(product.gallery[0].url)
    : null;
  const mainImageSrc = resolveImageSrc(product.mainImage.url);

  return (
    <article
      className="group relative min-w-0 w-full max-w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="flower-surface relative aspect-square overflow-hidden rounded-sm border border-deep-ink/10 shadow-sm transition-shadow group-hover:shadow-md">
          <Image
            src={mainImageSrc}
            alt={product.mainImage.alt ?? product.name}
            fill
            className={cn(
              "object-contain p-4 transition-opacity duration-300",
              hovered && galleryImage ? "opacity-0" : "opacity-100"
            )}
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={priority}
          />
          {galleryImage ? (
            <Image
              src={galleryImage}
              alt=""
              fill
              className={cn(
                "object-contain p-4 transition-opacity duration-300",
                hovered ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 768px) 50vw, 25vw"
              aria-hidden
            />
          ) : null}

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {onSale ? <Badge variant="sale">Sale</Badge> : null}
            {product.isBestseller ? <Badge variant="bestseller">Bestseller</Badge> : null}
            {product.isRiwaaz ? <Badge variant="riwaaz">Riwaaz</Badge> : null}
          </div>
        </div>
      </Link>

      {onQuickView ? (
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="sr-only"
          aria-label={`Quick view ${product.name}`}
        >
          Quick view
        </button>
      ) : null}

      <Link href={`/shop/${product.slug}`} className="mt-3 block space-y-1.5">
        <h3 className="font-display text-base font-semibold leading-snug text-deep-berry sm:text-lg">
          {product.name}
        </h3>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <PriceDisplay
            priceType={product.priceType}
            basePrice={product.basePrice}
            salePrice={product.salePrice}
            compareAtPrice={product.compareAtPrice}
            saleStartDate={product.saleStartDate}
            saleEndDate={product.saleEndDate}
            size="sm"
          />
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-deep-ink/55 group-hover:text-deep-berry">
            View details
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </Link>
    </article>
  );
}
