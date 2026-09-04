'use client';

import Link from 'next/link';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatPrice } from '@/lib/utils';
import type { IOrder } from '@/types';

interface OrdersTableProps {
  orders: IOrder[];
  pagination: {
    page: number;
    totalPages: number;
    basePath: string;
    searchParams?: Record<string, string>;
  };
}

export function OrdersTable({ orders, pagination }: OrdersTableProps) {
  return (
    <DataTable<IOrder>
      data={orders}
      keyExtractor={(row) => String(row._id)}
      pagination={pagination}
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
        { key: 'customer', header: 'Customer', cell: (row) => row.customerName },
        { key: 'email', header: 'Email', cell: (row) => row.customerEmail },
        { key: 'total', header: 'Total', cell: (row) => formatPrice(row.pricing.total) },
        { key: 'status', header: 'Status', cell: (row) => <StatusBadge status={row.status} /> },
        {
          key: 'payment',
          header: 'Payment',
          cell: (row) => <StatusBadge status={row.paymentStatus} />,
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
