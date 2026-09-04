"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import type { SerializedProduct } from "@/lib/storefront";
import { PriceDisplay } from "./PriceDisplay";
import { Badge } from "@/components/ui/Badge";
import { isSaleActive } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: SerializedProduct;
  onQuickView?: (product: SerializedProduct) => void;
  priority?: boolean;
}

export function ProductCard({ product, onQuickView, priority }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const onSale = isSaleActive(product.salePrice, product.saleStartDate, product.saleEndDate);
  const galleryImage = product.gallery?.[0]?.url;
  const [isNew] = useState(() => {
    if (!product.createdAt) return false;
    return (
      Date.now() - new Date(String(product.createdAt)).getTime() <
      1000 * 60 * 60 * 24 * 45
    );
  });

  return (
    <article
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <Link href={`/shop/${product.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-blush/10 shadow-sm ring-1 ring-champagne/25 transition-shadow duration-500 group-hover:shadow-lg group-hover:shadow-blush/15">
            <Image
              src={product.mainImage.url}
              alt={product.mainImage.alt ?? product.name}
              fill
              className={cn(
                "object-cover transition-transform duration-700 ease-out",
                hovered && galleryImage ? "scale-105 opacity-0" : "scale-100"
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
                  "object-cover transition-all duration-700 ease-out",
                  hovered ? "scale-105 opacity-100" : "scale-100 opacity-0"
                )}
                sizes="(max-width: 768px) 50vw, 25vw"
                aria-hidden
              />
            ) : null}

            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {onSale ? <Badge variant="sale">Sale</Badge> : null}
              {product.isBestseller ? <Badge variant="bestseller">Bestseller</Badge> : null}
              {isNew && !product.isBestseller ? <Badge variant="new">New</Badge> : null}
              {product.availability === "made_to_order" && !product.isBestseller && !isNew ? (
                <Badge variant="madeToOrder">Made to Order</Badge>
              ) : null}
              {product.isRiwaaz ? <Badge variant="riwaaz">Riwaaz</Badge> : null}
            </div>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setWishlisted((v) => !v)}
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-champagne/70 bg-ivory/95 text-deep-berry/70 shadow-sm backdrop-blur-sm transition-colors hover:border-dusty-rose/50 hover:text-deep-berry"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-4 w-4", wishlisted && "fill-deep-berry text-deep-berry")} />
        </button>

        {onQuickView ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            onClick={() => onQuickView(product)}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-deep-berry shadow-md backdrop-blur-sm transition-colors hover:bg-ivory"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="h-4 w-4" />
          </motion.button>
        ) : null}

        {product.availability === "out_of_stock" ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-ivory/60 backdrop-blur-[2px]">
            <span className="rounded-full bg-plum/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ivory">
              Sold Out
            </span>
          </div>
        ) : null}
      </div>

      <Link href={`/shop/${product.slug}`} className="mt-4 block space-y-2">
        <h3 className="font-display text-lg font-semibold text-deep-ink transition-colors group-hover:text-deep-berry md:text-xl">
          {product.name}
        </h3>
        <PriceDisplay
          priceType={product.priceType}
          basePrice={product.basePrice}
          salePrice={product.salePrice}
          compareAtPrice={product.compareAtPrice}
          saleStartDate={product.saleStartDate}
          saleEndDate={product.saleEndDate}
          size="sm"
        />
      </Link>
    </article>
  );
}
