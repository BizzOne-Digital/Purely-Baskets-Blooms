import { LotusMark } from "@/components/editorial/LotusMark";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface OrderSummaryItem {
  name: string;
  quantity: number;
  lineTotal?: number;
  subtitle?: string;
  imageUrl?: string;
}

interface OrderSummaryCardProps {
  items: OrderSummaryItem[];
  subtotal: number;
  delivery?: number;
  tax?: number;
  total: number;
  couponInput?: string;
  onCouponChange?: (value: string) => void;
  onApplyCoupon?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  showTrustBadges?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function OrderSummaryCard({
  items,
  subtotal,
  delivery,
  tax,
  total,
  couponInput,
  onCouponChange,
  onApplyCoupon,
  onSubmit,
  submitLabel = "Continue to Checkout",
  isLoading,
  showTrustBadges = true,
  className,
  children,
}: OrderSummaryCardProps) {
  return (
    <div
      className={cn(
        "sticky top-32 rounded-2xl border border-champagne/40 bg-ivory/90 p-6 shadow-xl shadow-blush/10 backdrop-blur-sm md:p-8",
        className
      )}
    >
      <div className="mb-6 flex items-center justify-center gap-2">
        <LotusMark size="sm" />
        <h2 className="font-display text-xl font-semibold text-deep-berry">Your Order</h2>
      </div>

      <ul className="space-y-4 border-b border-champagne/25 pb-5">
        {items.map((item) => (
          <li key={`${item.name}-${item.quantity}`} className="flex justify-between gap-3 text-sm">
            <div>
              <p className="font-medium text-deep-ink">{item.name}</p>
              {item.subtitle ? (
                <p className="text-xs text-deep-ink/50">{item.subtitle}</p>
              ) : null}
              <p className="text-xs text-deep-ink/45">Qty: {item.quantity}</p>
            </div>
            {item.lineTotal !== undefined ? (
              <span className="shrink-0 font-medium text-deep-berry">
                {formatPrice(item.lineTotal)}
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-deep-ink/60">Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        {delivery !== undefined ? (
          <div className="flex justify-between">
            <dt className="text-deep-ink/60">Delivery</dt>
            <dd>{formatPrice(delivery)}</dd>
          </div>
        ) : null}
        {tax !== undefined ? (
          <div className="flex justify-between">
            <dt className="text-deep-ink/60">Tax</dt>
            <dd>{formatPrice(tax)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between border-t border-champagne/25 pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd className="font-display text-deep-berry">{formatPrice(total)}</dd>
        </div>
      </dl>

      {onCouponChange ? (
        <div className="mt-5 flex gap-2">
          <input
            type="text"
            value={couponInput ?? ""}
            onChange={(e) => onCouponChange(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="flex-1 rounded-full border border-champagne/50 bg-ivory px-4 py-2 text-sm outline-none focus:border-dusty-rose/60"
          />
          {onApplyCoupon ? (
            <Button type="button" variant="outline" size="sm" onClick={onApplyCoupon}>
              Apply
            </Button>
          ) : null}
        </div>
      ) : null}

      {children}

      {onSubmit ? (
        <Button
          type="button"
          onClick={onSubmit}
          isLoading={isLoading}
          className="mt-6 w-full"
          size="lg"
        >
          {submitLabel}
        </Button>
      ) : null}

      {showTrustBadges ? (
        <p className="mt-4 text-center text-[11px] text-deep-ink/45">
          Your information is secure. We use industry-standard encryption.
        </p>
      ) : null}
    </div>
  );
}
