'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
  pagination?: {
    page: number;
    totalPages: number;
    basePath: string;
    searchParams?: Record<string, string>;
  };
  onRowClick?: (row: T) => void;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No records found.',
  pagination,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const buildPageUrl = (page: number) => {
    if (!pagination) return '#';
    const params = new URLSearchParams(pagination.searchParams);
    params.set('page', String(page));
    return `${pagination.basePath}?${params.toString()}`;
  };

  return (
    <div className={cn('overflow-hidden rounded-xl border border-[#F5D6DC]/60 bg-white', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#F5D6DC]/40 bg-[#FFF9F4]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#7A2048]',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'border-b border-gray-100 transition-colors last:border-0',
                    onRowClick && 'cursor-pointer hover:bg-[#FFF9F4]'
                  )}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={cn('px-4 py-3 text-[#241920]', col.className)}>
                      {col.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[#F5D6DC]/40 px-4 py-3">
          <p className="text-sm text-gray-500">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            {pagination.page > 1 && (
              <Link
                href={buildPageUrl(pagination.page - 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Link>
            )}
            {pagination.page < pagination.totalPages && (
              <Link
                href={buildPageUrl(pagination.page + 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
