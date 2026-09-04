import Link from 'next/link';
import {
  Package,
  ShoppingCart,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { getDashboardData } from '@/lib/admin-data';
import { StatsCard } from '@/components/admin/StatsCard';
import { SalesChart } from '@/components/admin/SalesChart';
import { OrderStatusChart } from '@/components/admin/OrderStatusChart';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { DataTable } from '@/components/admin/DataTable';
import { formatPrice } from '@/lib/utils';
import type { IOrder } from '@/types';

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      {'databaseError' in data && data.databaseError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          {String(data.databaseError)}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={formatPrice(data.stats.totalRevenue)}
          icon={DollarSign}
          subtitle="All paid orders"
        />
        <StatsCard
          title="Orders"
          value={data.stats.totalOrders}
          icon={ShoppingCart}
          subtitle={`${data.stats.pendingOrders} pending`}
        />
        <StatsCard
          title="Products"
          value={data.stats.publishedProducts}
          icon={Package}
          subtitle={`${data.stats.totalProducts} total`}
        />
        <StatsCard
          title="New Requests"
          value={data.stats.newBookings + data.stats.newInquiries}
          icon={Calendar}
          subtitle={`${data.stats.newBookings} bookings, ${data.stats.newInquiries} inquiries`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-[#F5D6DC]/60 bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-[#7A2048]">Revenue (Last 30 Days)</h2>
          <SalesChart data={data.salesByDay} />
        </div>
        <div className="rounded-xl border border-[#F5D6DC]/60 bg-white p-5">
          <h2 className="mb-4 text-base font-semibold text-[#7A2048]">Orders by Status</h2>
          <OrderStatusChart data={data.ordersByStatus} />
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#7A2048]">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-[#7A2048] hover:underline"
          >
            View all
          </Link>
        </div>
        <DataTable<IOrder>
          data={data.recentOrders}
          keyExtractor={(row) => String(row._id)}
          columns={[
            {
              key: 'orderNumber',
              header: 'Order',
              cell: (row) => (
                <Link
                  href={`/admin/orders/${row._id}`}
                  className="font-medium text-[#7A2048] hover:underline"
                >
                  {row.orderNumber}
                </Link>
              ),
            },
            {
              key: 'customer',
              header: 'Customer',
              cell: (row) => row.customerName,
            },
            {
              key: 'total',
              header: 'Total',
              cell: (row) => formatPrice(row.pricing.total),
            },
            {
              key: 'status',
              header: 'Status',
              cell: (row) => <StatusBadge status={row.status} />,
            },
            {
              key: 'date',
              header: 'Date',
              cell: (row) => new Date(row.createdAt).toLocaleDateString('en-CA'),
            },
          ]}
        />
      </div>
    </div>
  );
}
