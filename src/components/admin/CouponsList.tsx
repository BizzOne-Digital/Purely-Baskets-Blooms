'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { deleteCoupon, toggleCouponActive } from '@/actions/coupons';
import { DISCOUNT_TYPES } from '@/lib/constants';
import type { ICoupon } from '@/types';

interface CouponsListProps {
  data: { items: ICoupon[]; page: number; totalPages: number; total: number };
  searchParams: Record<string, string>;
}

export function CouponsList({ data, searchParams }: CouponsListProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteCoupon(deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (result.success) {
      toast.success('Coupon deleted');
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to delete');
    }
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    const result = await toggleCouponActive(id, !isActive);
    if (result.success) {
      toast.success(isActive ? 'Coupon deactivated' : 'Coupon activated');
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to update');
    }
  };

  const discountLabel = (coupon: ICoupon) => {
    const type = DISCOUNT_TYPES.find((d) => d.value === coupon.discountType);
    if (coupon.discountType === 'percentage') return `${coupon.discountValue}%`;
    if (coupon.discountType === 'fixed') return `$${coupon.discountValue}`;
    return type?.label ?? coupon.discountType;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form className="flex gap-2">
          <input
            name="search"
            defaultValue={searchParams.search}
            placeholder="Search coupons..."
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <button type="submit" className="rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white">
            Search
          </button>
        </form>
        <Link
          href="/admin/coupons/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white hover:bg-[#481936]"
        >
          <Plus className="h-4 w-4" />
          Add Coupon
        </Link>
      </div>

      <DataTable<ICoupon>
        data={data.items}
        keyExtractor={(row) => String(row._id)}
        pagination={{
          page: data.page,
          totalPages: data.totalPages,
          basePath: '/admin/coupons',
          searchParams,
        }}
        columns={[
          {
            key: 'code',
            header: 'Code',
            cell: (row) => (
              <Link href={`/admin/coupons/${row._id}`} className="font-mono font-medium text-[#7A2048] hover:underline">
                {row.code}
              </Link>
            ),
          },
          { key: 'discount', header: 'Discount', cell: (row) => discountLabel(row) },
          {
            key: 'usage',
            header: 'Usage',
            cell: (row) => `${row.usageCount}${row.usageLimit ? ` / ${row.usageLimit}` : ''}`,
          },
          {
            key: 'expiry',
            header: 'Expires',
            cell: (row) => new Date(row.expiryDate).toLocaleDateString('en-CA'),
          },
          {
            key: 'active',
            header: 'Status',
            cell: (row) => (
              <button type="button" onClick={() => handleToggle(String(row._id), row.isActive)}>
                <StatusBadge status={row.isActive ? 'active' : 'inactive'} label={row.isActive ? 'Active' : 'Inactive'} />
              </button>
            ),
          },
          {
            key: 'actions',
            header: '',
            cell: (row) => (
              <button
                type="button"
                onClick={() => setDeleteId(String(row._id))}
                className="rounded p-1.5 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            ),
          },
        ]}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Coupon"
        description="This coupon will be permanently removed."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
