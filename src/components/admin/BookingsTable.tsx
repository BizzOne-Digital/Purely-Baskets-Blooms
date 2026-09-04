'use client';

import Link from 'next/link';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { SERVICE_TYPES } from '@/lib/constants';
import type { IBooking } from '@/types';

interface BookingsTableProps {
  bookings: IBooking[];
  pagination: {
    page: number;
    totalPages: number;
    basePath: string;
    searchParams?: Record<string, string>;
  };
}

export function BookingsTable({ bookings, pagination }: BookingsTableProps) {
  return (
    <DataTable<IBooking>
      data={bookings}
      keyExtractor={(row) => String(row._id)}
      pagination={pagination}
      columns={[
        {
          key: 'customer',
          header: 'Customer',
          cell: (row) => (
            <Link
              href={`/admin/bookings/${row._id}`}
              className="font-medium text-[#7A2048] hover:underline"
            >
              {row.customerName}
            </Link>
          ),
        },
        {
          key: 'service',
          header: 'Service',
          cell: (row) =>
            SERVICE_TYPES.find((s) => s.value === row.serviceType)?.label ?? row.serviceType,
        },
        { key: 'status', header: 'Status', cell: (row) => <StatusBadge status={row.status} /> },
        {
          key: 'date',
          header: 'Submitted',
          cell: (row) => new Date(row.createdAt).toLocaleDateString('en-CA'),
        },
      ]}
    />
  );
}
