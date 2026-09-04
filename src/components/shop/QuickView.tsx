"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { SerializedProduct } from "@/lib/storefront";
import { PriceDisplay } from "./PriceDisplay";
import { Button } from "@/components/ui/Button";
import { createCartItemFromProduct, useCartStore } from "@/store/cart-store";
import { useCartDrawer } from "@/components/layout/cart-drawer-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface QuickViewProps {
  product: SerializedProduct | null;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const reducedMotion = useReducedMotion();
  const addItem = useCartStore((s) => s.addItem);
  const { openCart } = useCartDrawer();

  const handleAddToCart = () => {
    if (!product) return;
    const item = createCartItemFromProduct(product);
    if (!item) {
      toast.error("Please contact us for pricing on this item");
      return;
    }
    addItem(item);
    toast.success(`${product.name} added to cart`);
    openCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {product ? (
        <>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-[90] bg-plum/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-1/2 z-[100] mx-auto max-w-3xl -translate-y-1/2 rounded-2xl glass-panel border border-champagne/30 p-6 shadow-2xl md:p-8"
            role="dialog"
            aria-label={`Quick view: ${product.name}`}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full hover:bg-blush/40"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-blush/20">
                <Image
                  src={product.mainImage.url}
                  alt={product.mainImage.alt ?? product.name}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-serif text-2xl text-deep-berry">{product.name}</h2>
                <div className="mt-2">
                  <PriceDisplay
                    priceType={product.priceType}
                    basePrice={product.basePrice}
                    salePrice={product.salePrice}
                    compareAtPrice={product.compareAtPrice}
                    saleStartDate={product.saleStartDate}
                    saleEndDate={product.saleEndDate}
                  />
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-deep-ink/70">
                  {product.shortDescription}
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  {product.priceType !== "quote" && product.availability !== "out_of_stock" ? (
                    <Button onClick={handleAddToCart} className="flex-1">
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  ) : null}
                  <Link href={`/shop/${product.slug}`} onClick={onClose} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
