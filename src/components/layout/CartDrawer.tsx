"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore, getCartItemKey } from "@/store/cart-store";
import { useCartDrawer } from "./cart-drawer-context";
import { formatPrice, formatPriceDisplay } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CartDrawer() {
  const { isOpen, closeCart } = useCartDrawer();
  const reducedMotion = useReducedMotion();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const subtotal = getSubtotal();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-[70] bg-plum/30 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden
          />
          <motion.aside
            initial={reducedMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reducedMotion ? undefined : { x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col glass-panel border-l border-champagne/30 shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-champagne/20 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-deep-berry" />
                <h2 className="font-serif text-lg text-deep-berry">Your Cart</h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-blush/40"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4" data-lenis-prevent>
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-4 h-10 w-10 text-champagne" />
                  <p className="font-serif text-deep-berry">Your cart is empty</p>
                  <p className="mt-2 text-sm text-deep-ink/50">
                    Discover our thoughtfully curated collections
                  </p>
                  <Link href="/shop" onClick={closeCart} className="mt-6">
                    <Button variant="secondary">Shop Now</Button>
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => {
                    const key = getCartItemKey(item);
                    const lineTotal =
                      (item.unitPrice + (item.sizePriceModifier ?? 0)) * item.quantity +
                      item.selectedAddOns.reduce(
                        (s, a) => s + a.price * a.quantity,
                        0
                      );
                    return (
                      <li key={key} className="flex gap-4">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-blush/30">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link
                                href={`/shop/${item.slug}`}
                                onClick={closeCart}
                                className="font-medium text-deep-ink hover:text-deep-berry"
                              >
                                {item.name}
                              </Link>
                              {item.selectedSize ? (
                                <p className="text-xs text-deep-ink/50">Size: {item.selectedSize}</p>
                              ) : null}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(key)}
                              className="text-deep-ink/40 hover:text-coral"
                              aria-label={`Remove ${item.name}`}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-deep-berry">
                            {formatPriceDisplay(item.priceType, item.unitPrice)}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-champagne/40 bg-ivory/50">
                              <button
                                type="button"
                                onClick={() => updateQuantity(key, item.quantity - 1)}
                                className="flex h-7 w-7 items-center justify-center hover:text-deep-berry"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(key, item.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center hover:text-deep-berry"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-medium">{formatPrice(lineTotal)}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 ? (
              <div className="border-t border-champagne/20 px-6 py-5">
                <div className="mb-4 flex justify-between text-sm">
                  <span className="text-deep-ink/60">Subtotal</span>
                  <span className="font-medium text-deep-berry">{formatPrice(subtotal)}</span>
                </div>
                <p className="mb-4 text-xs text-deep-ink/50">
                  Shipping and taxes calculated at checkout
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/checkout" onClick={closeCart}>
                    <Button className="w-full">Checkout</Button>
                  </Link>
                  <Link href="/cart" onClick={closeCart}>
                    <Button variant="outline" className="w-full">
                      View Full Cart
                    </Button>
                  </Link>
                </div>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
