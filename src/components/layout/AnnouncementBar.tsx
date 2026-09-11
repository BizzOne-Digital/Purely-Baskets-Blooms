import Link from "next/link";
import { Tag } from "lucide-react";
import type { SerializedCoupon, SerializedSiteSettings } from "@/lib/storefront";

interface AnnouncementBarProps {
  settings: SerializedSiteSettings;
  coupons: SerializedCoupon[];
}

function formatCouponMessage(coupon: SerializedCoupon): string {
  if (coupon.description) return coupon.description;
  if (coupon.discountType === "percentage") {
    return `${coupon.discountValue}% off — use code ${coupon.code}`;
  }
  if (coupon.discountType === "fixed") {
    return `$${coupon.discountValue} off — use code ${coupon.code}`;
  }
  return `Free delivery — use code ${coupon.code}`;
}

export function AnnouncementBar({ settings, coupons }: AnnouncementBarProps) {
  const bar = settings.announcementBar;
  const activeCoupon = coupons[0];

  if (!bar?.enabled && !activeCoupon) return null;

  const message = bar?.enabled && bar.message
    ? bar.message
    : activeCoupon
      ? formatCouponMessage(activeCoupon)
      : null;

  if (!message) return null;

  const href = bar?.link;
  const linkLabel = bar?.linkLabel;

  return (
    <div className="relative z-[60] overflow-hidden border-b border-gold/20 bg-carbon-elevated text-cream">
      <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-center gap-2 px-4 py-2.5 text-center text-xs tracking-wide md:text-sm">
        <Tag className="hidden h-3.5 w-3.5 shrink-0 md:block" aria-hidden />
        <span className="min-w-0 break-words">{message}</span>
        {href && linkLabel ? (
          <>
            <span className="text-ivory/40" aria-hidden>
              ·
            </span>
            <Link href={href} className="underline underline-offset-2 hover:text-blush">
              {linkLabel}
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}
