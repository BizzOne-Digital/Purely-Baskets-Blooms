'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { couponSchema } from '@/validations/coupon';
import { createCoupon, updateCoupon } from '@/actions/coupons';
import { DISCOUNT_TYPES } from '@/lib/constants';
import type { CouponInput } from '@/validations/coupon';
import type { ICoupon, IProduct, ICategory } from '@/types';

interface CouponFormProps {
  coupon?: ICoupon;
  products?: IProduct[];
  categories?: ICategory[];
}

export function CouponForm({ coupon, products = [], categories = [] }: CouponFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const isEditing = !!coupon;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CouponInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(couponSchema) as any,
    defaultValues: {
      code: coupon?.code ?? '',
      description: coupon?.description ?? '',
      discountType: coupon?.discountType ?? 'percentage',
      discountValue: coupon?.discountValue ?? 10,
      minimumSpend: coupon?.minimumSpend ?? undefined,
      maximumDiscount: coupon?.maximumDiscount ?? undefined,
      usageLimit: coupon?.usageLimit ?? undefined,
      perCustomerLimit: coupon?.perCustomerLimit ?? undefined,
      applicableProducts: coupon?.applicableProducts?.map(String) ?? [],
      applicableCategories: coupon?.applicableCategories?.map(String) ?? [],
      startDate: coupon?.startDate ? new Date(coupon.startDate) : new Date(),
      expiryDate: coupon?.expiryDate
        ? new Date(coupon.expiryDate)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isActive: coupon?.isActive ?? true,
      isPublic: coupon?.isPublic ?? false,
      displayOnWebsite: coupon?.displayOnWebsite ?? false,
    },
  });

  const discountType = watch('discountType');

  const onSubmit = async (data: CouponInput) => {
    setSaving(true);
    try {
      const result = isEditing
        ? await updateCoupon(String(coupon._id), data)
        : await createCoupon(data);

      if (!result.success) {
        toast.error(result.error ?? 'Failed to save coupon');
        return;
      }

      toast.success(isEditing ? 'Coupon updated' : 'Coupon created');
      router.push('/admin/coupons');
      router.refresh();
    } catch {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#7A2048] focus:outline-none focus:ring-1 focus:ring-[#7A2048]';
  const labelClass = 'block text-sm font-medium text-[#241920] mb-1';
  const sectionClass = 'rounded-xl border border-[#F5D6DC]/60 bg-white p-5 space-y-4';
  const errorClass = 'text-xs text-red-600 mt-1';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-6">
      <div className={sectionClass}>
        <h2 className="text-base font-semibold text-[#7A2048]">Coupon Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Code *</label>
            <input
              {...register('code')}
              className={inputClass}
              placeholder="SUMMER20"
              style={{ textTransform: 'uppercase' }}
            />
            {errors.code && <p className={errorClass}>{errors.code.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Discount Type</label>
            <select {...register('discountType')} className={inputClass}>
              {DISCOUNT_TYPES.map((dt) => (
                <option key={dt.value} value={dt.value}>
                  {dt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Discount Value {discountType === 'percentage' ? '(%)' : '(CAD)'}
            </label>
            <input
              type="number"
              step="0.01"
              {...register('discountValue', { valueAsNumber: true })}
              className={inputClass}
            />
            {errors.discountValue && (
              <p className={errorClass}>{errors.discountValue.message}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Minimum Spend</label>
            <input
              type="number"
              step="0.01"
              {...register('minimumSpend', { valueAsNumber: true })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Maximum Discount</label>
            <input
              type="number"
              step="0.01"
              {...register('maximumDiscount', { valueAsNumber: true })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Usage Limit</label>
            <input
              type="number"
              {...register('usageLimit', { valueAsNumber: true })}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea {...register('description')} rows={2} className={inputClass} />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h2 className="text-base font-semibold text-[#7A2048]">Validity</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Start Date</label>
            <input
              type="date"
              {...register('startDate')}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Expiry Date</label>
            <input
              type="date"
              {...register('expiryDate')}
              className={inputClass}
            />
            {errors.expiryDate && (
              <p className={errorClass}>{errors.expiryDate.message}</p>
            )}
          </div>
        </div>
      </div>

      {products.length > 0 && (
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-[#7A2048]">Applicable Products</h2>
          <select
            multiple
            {...register('applicableProducts')}
            className={`${inputClass} h-32`}
          >
            {products.map((p) => (
              <option key={String(p._id)} value={String(p._id)}>
                {p.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple. Leave empty for all products.</p>
        </div>
      )}

      {categories.length > 0 && (
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-[#7A2048]">Applicable Categories</h2>
          <select
            multiple
            {...register('applicableCategories')}
            className={`${inputClass} h-32`}
          >
            {categories.map((c) => (
              <option key={String(c._id)} value={String(c._id)}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={sectionClass}>
        <h2 className="text-base font-semibold text-[#7A2048]">Options</h2>
        <div className="space-y-2">
          {[
            { key: 'isActive' as const, label: 'Active' },
            { key: 'isPublic' as const, label: 'Public (usable by anyone)' },
            { key: 'displayOnWebsite' as const, label: 'Display on website' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register(key)} className="rounded border-gray-300" />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#7A2048] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#481936] disabled:opacity-50"
        >
          {saving ? 'Saving...' : isEditing ? 'Update Coupon' : 'Create Coupon'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
