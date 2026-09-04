'use client';

import Link from 'next/link';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatPrice } from '@/lib/utils';
import type { IOrder } from '@/types';

interface RecentOrdersTableProps {
  orders: IOrder[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <DataTable<IOrder>
      data={orders}
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
  );
}
