import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getCoupon, getProducts, getCategories } from '@/lib/admin-data';
import { CouponForm } from '@/components/admin/CouponForm';
import type { ICoupon, IProduct, ICategory } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCouponPage({ params }: PageProps) {
  const { id } = await params;
  const [coupon, products, categories] = await Promise.all([
    getCoupon(id),
    getProducts({ page: 1 }).then((r) => r.items),
    getCategories(),
  ]);

  if (!coupon) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/coupons" className="mb-2 inline-flex items-center gap-1 text-sm text-[#7A2048] hover:underline">
          <ChevronLeft className="h-4 w-4" />
          Back to Coupons
        </Link>
        <h1 className="text-xl font-semibold text-[#241920]">Edit Coupon</h1>
        <p className="font-mono text-sm text-gray-500">{(coupon as ICoupon).code}</p>
      </div>
      <CouponForm
        coupon={coupon as ICoupon}
        products={products as IProduct[]}
        categories={categories as ICategory[]}
      />
    </div>
  );
}
