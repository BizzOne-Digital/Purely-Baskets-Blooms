"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { resolveImageSrc } from "@/lib/image-url";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  mainImage: ProductImage;
  gallery: ProductImage[];
  productName: string;
}

export function ProductGallery({ mainImage, gallery, productName }: ProductGalleryProps) {
  const images = [mainImage, ...gallery.filter((g) => g.url !== mainImage.url)];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? mainImage;
  const activeSrc = resolveImageSrc(active.url);

  return (
    <div className="space-y-4">
      <div className="flower-surface relative aspect-[4/5] overflow-hidden rounded-sm shadow-lg shadow-black/30 ring-1 ring-gold/20">
        <Image
          key={active.url}
          src={activeSrc}
          alt={active.alt ?? productName}
          fill
          className="object-contain p-6 transition-opacity duration-500"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {images.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-20 w-16 shrink-0 overflow-hidden rounded-lg transition-all",
                i === activeIndex
                  ? "ring-2 ring-deep-berry ring-offset-2 ring-offset-ivory"
                  : "opacity-60 hover:opacity-100"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={resolveImageSrc(img.url)}
                alt={img.alt ?? `${productName} ${i + 1}`}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
