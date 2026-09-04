import { formatPrice, isSaleActive } from "@/lib/utils";
import type { PriceType } from "@/types";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  priceType: PriceType;
  basePrice?: number | null;
  salePrice?: number | null;
  compareAtPrice?: number | null;
  saleStartDate?: string | Date | null;
  saleEndDate?: string | Date | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function PriceDisplay({
  priceType,
  basePrice,
  salePrice,
  compareAtPrice,
  saleStartDate,
  saleEndDate,
  className,
  size = "md",
}: PriceDisplayProps) {
  const onSale = isSaleActive(salePrice, saleStartDate, saleEndDate);
  const displayPrice = onSale ? salePrice : basePrice;

  if (priceType === "quote") {
    return (
      <span className={cn("font-medium text-deep-berry", sizeClasses[size], className)}>
        Request a Quote
      </span>
    );
  }

  if (displayPrice === null || displayPrice === undefined) {
    return (
      <span className={cn("font-medium text-deep-berry", sizeClasses[size], className)}>
        {priceType === "starting" ? "Starting price coming soon" : "Contact for pricing"}
      </span>
    );
  }

  const formatted = formatPrice(displayPrice);

  return (
    <span className={cn("inline-flex flex-col gap-0.5", className)}>
      {priceType === "starting" ? (
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-marigold/90">
          From
        </span>
      ) : null}
      <span className="inline-flex items-baseline gap-2">
        <span className={cn("font-display font-semibold text-marigold", sizeClasses[size])}>
          {formatted}
        </span>
        {onSale && compareAtPrice ? (
          <span className="text-sm text-deep-ink/40 line-through">
            {formatPrice(compareAtPrice)}
          </span>
        ) : onSale && basePrice ? (
          <span className="text-sm text-deep-ink/40 line-through">
            {formatPrice(basePrice)}
          </span>
        ) : null}
      </span>
    </span>
  );
}
