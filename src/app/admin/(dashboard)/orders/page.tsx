import Link from 'next/link';
import { getOrders } from '@/lib/admin-data';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatPrice } from '@/lib/utils';
import { ORDER_STATUSES, ORDER_STATUS_LABELS, PAYMENT_STATUSES, PAYMENT_STATUS_LABELS } from '@/lib/constants';
import type { IOrder } from '@/types';

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search ?? '';
  const status = params.status ?? '';
  const paymentStatus = params.paymentStatus ?? '';
  const page = Number(params.page) || 1;

  const data = await getOrders({
    search,
    status: status || undefined,
    paymentStatus: paymentStatus || undefined,
    page,
  });

  const searchParamsRecord: Record<string, string> = {};
  if (search) searchParamsRecord.search = search;
  if (status) searchParamsRecord.status = status;
  if (paymentStatus) searchParamsRecord.paymentStatus = paymentStatus;

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#241920]">Orders</h1>
        <p className="text-sm text-gray-500">{data.total} orders total</p>
      </div>

      <form className="flex flex-wrap gap-2">
        <input
          name="search"
          defaultValue={search}
          placeholder="Search orders..."
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#7A2048] focus:outline-none focus:ring-1 focus:ring-[#7A2048]"
        />
        <select name="status" defaultValue={status} className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>
          ))}
        </select>
        <select name="paymentStatus" defaultValue={paymentStatus} className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
          <option value="">All payments</option>
          {PAYMENT_STATUSES.map((s) => (
            <option key={s} value={s}>{PAYMENT_STATUS_LABELS[s]}</option>
          ))}
        </select>
        <button type="submit" className="rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white hover:bg-[#481936]">
          Filter
        </button>
      </form>

      <DataTable<IOrder>
        data={data.items}
        keyExtractor={(row) => String(row._id)}
        pagination={{
          page: data.page,
          totalPages: data.totalPages,
          basePath: '/admin/orders',
          searchParams: searchParamsRecord,
        }}
        columns={[
          {
            key: 'orderNumber',
            header: 'Order',
            cell: (row) => (
              <Link href={`/admin/orders/${row._id}`} className="font-medium text-[#7A2048] hover:underline">
                {row.orderNumber}
              </Link>
            ),
          },
          { key: 'customer', header: 'Customer', cell: (row) => row.customerName },
          { key: 'email', header: 'Email', cell: (row) => row.customerEmail },
          { key: 'total', header: 'Total', cell: (row) => formatPrice(row.pricing.total) },
          { key: 'status', header: 'Status', cell: (row) => <StatusBadge status={row.status} /> },
          { key: 'payment', header: 'Payment', cell: (row) => <StatusBadge status={row.paymentStatus} /> },
          {
            key: 'date',
            header: 'Date',
            cell: (row) => new Date(row.createdAt).toLocaleDateString('en-CA'),
          },
        ]}
      />
    </div>
  );
}
