'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Search, Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { deleteProduct, duplicateProduct, toggleProductStatus } from '@/actions/products';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import type { IProduct } from '@/types';

interface ProductsListProps {
  data: {
    items: IProduct[];
    total: number;
    page: number;
    totalPages: number;
  };
  searchParams: Record<string, string>;
  categories: Array<{ _id: string; name: string }>;
}

export function ProductsList({ data, searchParams, categories }: ProductsListProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteProduct(deleteId);
    setDeleting(false);
    setDeleteId(null);

    if (result.success) {
      toast.success('Product deleted');
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to delete');
    }
  };

  const handleDuplicate = async (id: string) => {
    const result = await duplicateProduct(id);
    if (result.success && result.data) {
      toast.success('Product duplicated');
      router.push(`/admin/products/${result.data.id}`);
    } else {
      toast.error(result.error ?? 'Failed to duplicate');
    }
  };

  const handleToggleStatus = async (id: string, current: string) => {
    const newStatus = current === 'published' ? 'draft' : 'published';
    const result = await toggleProductStatus(id, newStatus as 'draft' | 'published');
    if (result.success) {
      toast.success(`Product ${newStatus}`);
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to update status');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              name="search"
              defaultValue={searchParams.search}
              placeholder="Search products..."
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-[#7A2048] focus:outline-none focus:ring-1 focus:ring-[#7A2048]"
            />
          </div>
          <select
            name="status"
            defaultValue={searchParams.status ?? ''}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            name="category"
            defaultValue={searchParams.category ?? ''}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white hover:bg-[#481936]"
          >
            Filter
          </button>
        </form>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white hover:bg-[#481936]"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <DataTable<IProduct>
        data={data.items}
        keyExtractor={(row) => String(row._id)}
        pagination={{
          page: data.page,
          totalPages: data.totalPages,
          basePath: '/admin/products',
          searchParams,
        }}
        columns={[
          {
            key: 'image',
            header: '',
            className: 'w-12',
            cell: (row) => (
              <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-[#F5D6DC]">
                {row.mainImage?.url && (
                  <Image src={row.mainImage.url} alt="" fill className="object-cover" />
                )}
              </div>
            ),
          },
          {
            key: 'name',
            header: 'Product',
            cell: (row) => (
              <div>
                <Link
                  href={`/admin/products/${row._id}`}
                  className="font-medium text-[#7A2048] hover:underline"
                >
                  {row.name}
                </Link>
                <p className="text-xs text-gray-500">{row.slug}</p>
              </div>
            ),
          },
          {
            key: 'price',
            header: 'Price',
            cell: (row) =>
              row.priceType === 'quote'
                ? 'Quote'
                : formatPrice(row.salePrice ?? row.basePrice),
          },
          {
            key: 'status',
            header: 'Status',
            cell: (row) => (
              <button
                type="button"
                onClick={() => handleToggleStatus(String(row._id), row.status)}
              >
                <StatusBadge status={row.status} />
              </button>
            ),
          },
          {
            key: 'actions',
            header: '',
            className: 'w-24',
            cell: (row) => (
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleDuplicate(String(row._id))}
                  className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#7A2048]"
                  title="Duplicate"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(String(row._id))}
                  className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ),
          },
        ]}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Product"
        description="This action cannot be undone. The product will be permanently removed."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
