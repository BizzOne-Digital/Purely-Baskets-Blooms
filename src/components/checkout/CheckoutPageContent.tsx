"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { checkoutSchema, type CheckoutInput } from "@/validations/order";
import { useCartStore } from "@/store/cart-store";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { EditorialBackdrop } from "@/components/editorial/EditorialBackdrop";
import { StepProgress } from "@/components/editorial/StepProgress";
import { OrderSummaryCard } from "@/components/editorial/OrderSummaryCard";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { LotusMark } from "@/components/editorial/LotusMark";
import Link from "next/link";
import { Calendar, Lock } from "lucide-react";
import { ORDER_TIMELINE, PAYMENT_INFO } from "@/lib/order-policy";

interface CheckoutPageContentProps {
  stripeEnabled: boolean;
  deliveryCharge: number;
  taxRate: number;
}

const CHECKOUT_STEPS = ["Information", "Delivery", "Payment"];

export function CheckoutPageContent({
  stripeEnabled,
  deliveryCharge,
  taxRate,
}: CheckoutPageContentProps) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const couponCode = useCartStore((s) => s.couponCode);
  const clearCart = useCartStore((s) => s.clearCart);
  const isHydrated = useCartStore((s) => s.isHydrated);
  const [submitting, setSubmitting] = useState(false);
  const [couponInput, setCouponInput] = useState(couponCode ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: stripeEnabled ? "stripe" : "manual",
      deliveryAddress: { province: "ON", country: "CA", street: "", city: "", postalCode: "" },
    },
  });

  if (!isHydrated) {
    return (
      <EditorialBackdrop>
        <p className="py-20 text-center text-deep-ink/50">Loading...</p>
      </EditorialBackdrop>
    );
  }

  if (items.length === 0) {
    return (
      <EditorialBackdrop>
        <section className="mx-auto max-w-7xl px-4 py-20 text-center">
          <DisplayHeading as="h1" size="page">
            Checkout
          </DisplayHeading>
          <p className="mt-4 text-deep-ink/60">Your cart is empty</p>
          <Link href="/shop" className="mt-6 inline-block">
            <Button>Continue Shopping</Button>
          </Link>
        </section>
      </EditorialBackdrop>
    );
  }

  const subtotal = items.reduce((sum, item) => {
    const line =
      (item.unitPrice + (item.sizePriceModifier ?? 0)) * item.quantity +
      item.selectedAddOns.reduce((s, a) => s + a.price * a.quantity, 0);
    return sum + line;
  }, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryCharge + tax;

  const onSubmit = async (data: Record<string, unknown>) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        items: items.map((item) => ({
          productId: item.productId,
          slug: item.slug,
          name: item.name,
          imageUrl: item.imageUrl,
          priceType: item.priceType,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          sizePriceModifier: item.sizePriceModifier ?? 0,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          selectedOptions: item.selectedOptions,
          selectedAddOns: item.selectedAddOns,
          giftMessage: item.giftMessage,
          recipientName: item.recipientName,
          preferredDeliveryDate: item.preferredDeliveryDate,
          leadTime: item.leadTime,
        })),
        couponCode: couponInput || undefined,
        paymentMethod: (stripeEnabled ? "stripe" : "manual") as CheckoutInput["paymentMethod"],
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error ?? "Checkout failed");
        return;
      }

      clearCart();

      if (result.checkoutUrl) {
        globalThis.location.assign(result.checkoutUrl);
      } else {
        router.push(`/order-confirmation/${result.orderNumber}`);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <EditorialBackdrop variant="shop">
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <RevealOnScroll className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <DisplayHeading as="h1" size="page" italic>
              Complete Your Order
            </DisplayHeading>
            <p className="mt-2 text-sm text-deep-ink/60">Secure checkout for your selections</p>
          </div>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-deep-ink/50">
            <Lock className="h-4 w-4 text-marigold" />
            Secure Checkout
          </span>
        </RevealOnScroll>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          <div className="lg:col-span-2">
            <RevealOnScroll>
              <div className="rounded-3xl border border-champagne/35 bg-ivory/90 p-6 shadow-lg md:p-8">
                <StepProgress steps={CHECKOUT_STEPS} currentStep={0} className="mb-8" />

                <div className="space-y-8">
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <LotusMark size="sm" />
                      <h2 className="font-display text-xl font-semibold text-deep-berry">
                        Contact Information
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <Input
                        label="Full Name"
                        {...register("customerName")}
                        error={errors.customerName?.message}
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        {...register("customerEmail")}
                        error={errors.customerEmail?.message}
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        {...register("customerPhone")}
                        error={errors.customerPhone?.message}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <LotusMark size="sm" />
                      <h2 className="font-display text-xl font-semibold text-deep-berry">
                        Recipient & Delivery
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <Input label="Recipient Full Name" {...register("recipientName")} />
                      <Input
                        label="Delivery Address"
                        {...register("deliveryAddress.street")}
                        error={errors.deliveryAddress?.street?.message}
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          label="City"
                          {...register("deliveryAddress.city")}
                          error={errors.deliveryAddress?.city?.message}
                        />
                        <Input
                          label="Postal Code"
                          {...register("deliveryAddress.postalCode")}
                          error={errors.deliveryAddress?.postalCode?.message}
                        />
                      </div>
                      <Input label="Province" {...register("deliveryAddress.province")} />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          label="Preferred Delivery Date"
                          type="date"
                          {...register("preferredDeliveryDate")}
                        />
                        <Input
                          label="Delivery Instructions (Optional)"
                          {...register("deliveryInstructions")}
                        />
                      </div>
                      <Textarea label="Gift Message (Optional)" {...register("giftMessage")} rows={3} />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-deep-ink/10 bg-blush/30 p-4 text-sm text-deep-ink/75">
                    <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-deep-berry" />
                    <div>
                      <p className="font-medium text-deep-berry">{ORDER_TIMELINE.headline}</p>
                      <p className="mt-2">{ORDER_TIMELINE.standard}</p>
                      <p className="mt-2">{ORDER_TIMELINE.custom}</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.1} className="lg:col-span-1">
            <OrderSummaryCard
              items={items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                lineTotal:
                  (item.unitPrice + (item.sizePriceModifier ?? 0)) * item.quantity +
                  item.selectedAddOns.reduce((s, a) => s + a.price * a.quantity, 0),
              }))}
              subtotal={subtotal}
              delivery={deliveryCharge}
              tax={tax}
              total={total}
              couponInput={couponInput}
              onCouponChange={setCouponInput}
            >
              <Button type="submit" isLoading={submitting} className="mt-6 w-full" size="lg">
                {stripeEnabled ? "Continue to Payment" : "Place Order"}
              </Button>
            </OrderSummaryCard>

            <p className="mt-4 rounded-2xl border border-deep-ink/10 bg-ivory p-4 text-xs leading-relaxed text-deep-ink/70">
              <span className="mb-2 block font-medium text-deep-berry">{PAYMENT_INFO.headline}</span>
              {stripeEnabled ? PAYMENT_INFO.online : PAYMENT_INFO.manual}{" "}
              {PAYMENT_INFO.customQuote}
            </p>
          </RevealOnScroll>
        </form>
      </section>
    </EditorialBackdrop>
  );
}
