import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderByNumber } from "@/lib/storefront";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";
import { GradientCard } from "@/components/ui/GradientCard";
import { CheckCircle, Sparkles } from "lucide-react";

interface OrderConfirmationProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationProps) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber);
  if (!order) notFound();

  return (
    <>
      <PageHero
        eyebrow="Order Confirmed"
        eyebrowVariant="botanical"
        title="Thank You!"
        gradient="botanical"
      >
        <div className="flex items-center justify-center gap-3">
          <CheckCircle className="h-10 w-10 text-botanical" />
          <Sparkles className="h-6 w-6 text-marigold" />
        </div>
        <p className="mx-auto mt-6 max-w-lg text-deep-ink/70">
          Your order <strong className="text-deep-berry">{order.orderNumber}</strong> has been
          received. A confirmation email has been sent to {order.customerEmail}.
        </p>
      </PageHero>

      <PageSection tone="warm" containerClassName="py-12 md:py-16">
        <RevealOnScroll className="mx-auto max-w-2xl">
          <GradientCard accent="botanical" hover={false}>
            <h2 className="font-serif text-lg text-deep-berry">Order Summary</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between text-deep-ink/70">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-champagne/20 pt-4 font-medium">
              <span>Total</span>
              <span className="text-deep-berry">{formatPrice(order.pricing.total)}</span>
            </div>
          </GradientCard>

          <div className="mt-10 text-center">
            <Link href="/shop">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </RevealOnScroll>
      </PageSection>
    </>
  );
}
