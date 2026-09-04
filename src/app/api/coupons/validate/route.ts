import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Coupon } from '@/models';
import { validateCoupon } from '@/lib/pricing';
import {
  getClientIdentifier,
  rateLimit,
  createRateLimitResponse,
} from '@/lib/rate-limit';
import { couponValidationSchema } from '@/validations/order';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIdentifier(request.headers);
    const limit = rateLimit(`coupon-validate:${ip}`, {
      limit: 30,
      windowMs: 60_000,
    });

    if (!limit.success) {
      return createRateLimitResponse(limit.retryAfterMs ?? 60_000);
    }

    const body = await request.json();
    const parsed = couponValidationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const subtotal = parsed.data.items.reduce(
      (sum, item) =>
        sum +
        (item.unitPrice + (item.sizePriceModifier ?? 0)) * item.quantity +
        (item.selectedAddOns ?? []).reduce(
          (addonSum, addon) => addonSum + addon.price * addon.quantity,
          0
        ),
      0
    );

    const coupon = await Coupon.findOne({
      code: parsed.data.code.toUpperCase(),
    }).lean();

    const result = validateCoupon(coupon, subtotal, undefined, {
      productIds: parsed.data.items.map((item) => item.productId),
    });

    if (!result.valid || !result.coupon) {
      return NextResponse.json(
        { valid: false, error: result.message || 'Invalid coupon code' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      code: result.coupon.code,
      discountType: result.coupon.discountType,
      discountValue: result.coupon.discountValue,
      discountAmount: result.discountAmount,
      message: result.message,
    });
  } catch (error) {
    console.error('Coupon validate error:', error);
    return NextResponse.json(
      { error: 'Coupon validation failed' },
      { status: 500 }
    );
  }
}
