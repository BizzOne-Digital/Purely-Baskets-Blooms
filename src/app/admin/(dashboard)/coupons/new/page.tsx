import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { CouponForm } from '@/components/admin/CouponForm';

export default function NewCouponPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/coupons" className="mb-2 inline-flex items-center gap-1 text-sm text-[#7A2048] hover:underline">
          <ChevronLeft className="h-4 w-4" />
          Back to Coupons
        </Link>
        <h1 className="text-xl font-semibold text-[#241920]">New Coupon</h1>
      </div>
      <CouponForm />
    </div>
  );
}
