'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Coupon } from '@/models';
import { validateCoupon as validateCouponLogic } from '@/lib/pricing';
import { couponSchema, updateCouponSchema } from '@/validations/coupon';
import { couponValidationSchema } from '@/validations/order';
import {
  actionError,
  actionSuccess,
  serialize,
  type ActionResult,
} from './helpers';

export async function createCoupon(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const parsed = couponSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const existing = await Coupon.findOne({ code: parsed.data.code });
    if (existing) {
      return actionError('A coupon with this code already exists');
    }

    const coupon = await Coupon.create({
      ...parsed.data,
      minimumSpend: parsed.data.minimumSpend ?? undefined,
      maximumDiscount: parsed.data.maximumDiscount ?? undefined,
      usageLimit: parsed.data.usageLimit ?? undefined,
      perCustomerLimit: parsed.data.perCustomerLimit ?? undefined,
    });

    revalidatePath('/admin/coupons');
    revalidatePath('/');

    return actionSuccess({ id: coupon._id.toString() });
  } catch (error) {
    console.error('createCoupon error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to create coupon'
    );
  }
}

export async function updateCoupon(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = updateCouponSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    if (parsed.data.code) {
      const existing = await Coupon.findOne({
        code: parsed.data.code,
        _id: { $ne: id },
      });
      if (existing) {
        return actionError('A coupon with this code already exists');
      }
    }

    const coupon = await Coupon.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );

    if (!coupon) {
      return actionError('Coupon not found');
    }

    revalidatePath('/admin/coupons');
    revalidatePath('/');

    return actionSuccess(serialize(coupon));
  } catch (error) {
    console.error('updateCoupon error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update coupon'
    );
  }
}

export async function deleteCoupon(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      return actionError('Coupon not found');
    }

    revalidatePath('/admin/coupons');
    revalidatePath('/');

    return actionSuccess({ deleted: true });
  } catch (error) {
    console.error('deleteCoupon error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to delete coupon'
    );
  }
}

export async function validateCoupon(
  input: unknown
): Promise<
  ActionResult<{
    valid: boolean;
    code: string;
    discountType: string;
    discountValue: number;
    discountAmount?: number;
    message?: string;
  }>
> {
  try {
    const parsed = couponValidationSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
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

    const result = validateCouponLogic(coupon, subtotal, undefined, {
      productIds: parsed.data.items.map((item) => item.productId),
    });

    if (!result.valid || !result.coupon) {
      return actionError(result.message || 'Invalid coupon code');
    }

    return actionSuccess({
      valid: true,
      code: result.coupon.code,
      discountType: result.coupon.discountType,
      discountValue: result.coupon.discountValue,
      discountAmount: result.discountAmount,
      message: result.message,
    });
  } catch (error) {
    console.error('validateCoupon error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Coupon validation failed'
    );
  }
}

export async function toggleCouponActive(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const coupon = await Coupon.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true }
    );

    if (!coupon) {
      return actionError('Coupon not found');
    }

    revalidatePath('/admin/coupons');
    revalidatePath('/');

    return actionSuccess(serialize(coupon));
  } catch (error) {
    console.error('toggleCouponActive error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update coupon'
    );
  }
}
