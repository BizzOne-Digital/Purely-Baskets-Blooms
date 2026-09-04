"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Gift, Pencil } from "lucide-react";
import { useCartStore, getCartItemKey } from "@/store/cart-store";
import { formatPrice, formatPriceDisplay } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { EditorialBackdrop } from "@/components/editorial/EditorialBackdrop";
import { OrderSummaryCard } from "@/components/editorial/OrderSummaryCard";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function CartPageContent() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const isHydrated = useCartStore((s) => s.isHydrated);
  const subtotal = getSubtotal();

  if (!isHydrated) {
    return (
      <EditorialBackdrop>
        <p className="py-20 text-center text-deep-ink/50">Loading cart...</p>
      </EditorialBackdrop>
    );
  }

  return (
    <EditorialBackdrop variant="shop">
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        {items.length === 0 ? (
          <RevealOnScroll className="py-16 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-blush" />
            <DisplayHeading as="h1" size="page" className="mt-4">
              Your Cart
            </DisplayHeading>
            <p className="mt-4 text-deep-ink/60">Your cart is empty</p>
            <Link href="/shop" className="mt-6 inline-block">
              <Button>Continue Shopping</Button>
            </Link>
          </RevealOnScroll>
        ) : (
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
            <div className="lg:col-span-2">
              <RevealOnScroll>
                <DisplayHeading as="h1" size="page" italic>
                  Your Cart
                </DisplayHeading>
                <p className="mt-2 text-deep-ink/60">Beautiful choices for a meaningful moment.</p>
              </RevealOnScroll>

              <div className="mt-8 space-y-5">
                {items.map((item, i) => {
                  const key = getCartItemKey(item);
                  const lineTotal =
                    (item.unitPrice + (item.sizePriceModifier ?? 0)) * item.quantity +
                    item.selectedAddOns.reduce((s, a) => s + a.price * a.quantity, 0);
                  return (
                    <RevealOnScroll key={key} delay={i * 0.05}>
                      <div className="flex gap-4 rounded-2xl border border-champagne/35 bg-ivory/80 p-4 shadow-sm backdrop-blur-sm md:p-6">
                        <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-blush/20">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <Link
                                href={`/shop/${item.slug}`}
                                className="font-display text-lg font-semibold text-deep-berry hover:text-dusty-rose"
                              >
                                {item.name}
                              </Link>
                              <p className="mt-1 text-sm text-deep-ink/50">
                                {formatPriceDisplay(item.priceType, item.unitPrice)}
                              </p>
                            </div>
                            <span className="font-display font-semibold text-deep-berry">
                              {formatPrice(lineTotal)}
                            </span>
                          </div>
                          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                            <div className="flex items-center gap-2 rounded-full border border-champagne/40 px-1">
                              <button
                                type="button"
                                onClick={() => updateQuantity(key, item.quantity - 1)}
                                className="flex h-8 w-8 items-center justify-center"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(key, item.quantity + 1)}
                                className="flex h-8 w-8 items-center justify-center"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-deep-ink/45">
                              <Link
                                href={`/shop/${item.slug}`}
                                className="inline-flex items-center gap-1 hover:text-deep-berry"
                              >
                                <Pencil className="h-3 w-3" />
                                Edit
                              </Link>
                              <button
                                type="button"
                                onClick={() => removeItem(key)}
                                className="inline-flex items-center gap-1 hover:text-coral"
                              >
                                <Trash2 className="h-3 w-3" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  );
                })}
              </div>

              <RevealOnScroll delay={0.1} className="mt-6">
                <div className="flex items-center gap-3 rounded-2xl border border-champagne/30 bg-champagne/15 px-5 py-4 text-sm text-deep-ink/65">
                  <Gift className="h-5 w-5 shrink-0 text-marigold" />
                  Add a gift message at checkout and make your gift even more special.
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.15} className="lg:col-span-1">
              <OrderSummaryCard
                items={items.map((item) => ({
                  name: item.name,
                  quantity: item.quantity,
                  lineTotal:
                    (item.unitPrice + (item.sizePriceModifier ?? 0)) * item.quantity +
                    item.selectedAddOns.reduce((s, a) => s + a.price * a.quantity, 0),
                }))}
                subtotal={subtotal}
                total={subtotal}
                submitLabel="Continue to Checkout"
                onSubmit={() => {
                  globalThis.location.assign("/checkout");
                }}
              />
              <Link
                href="/shop"
                className="mt-4 block text-center text-sm text-dusty-rose hover:text-deep-berry"
              >
                Continue Shopping →
              </Link>
            </RevealOnScroll>
          </div>
        )}
      </section>
    </EditorialBackdrop>
  );
}
