import { getBookings } from '@/lib/admin-data';
import { BookingsTable } from '@/components/admin/BookingsTable';
import { BOOKING_STATUSES, BOOKING_STATUS_LABELS } from '@/lib/constants';
import type { IBooking } from '@/types';

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function BookingsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search ?? '';
  const status = params.status ?? '';
  const page = Number(params.page) || 1;

  const data = await getBookings({ search, status: status || undefined, page });

  const searchParamsRecord: Record<string, string> = {};
  if (search) searchParamsRecord.search = search;
  if (status) searchParamsRecord.status = status;

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#241920]">Bookings</h1>
        <p className="text-sm text-gray-500">{data.total} booking requests</p>
      </div>

      <form className="flex flex-wrap gap-2">
        <input name="search" defaultValue={search} placeholder="Search..." className="rounded-lg border border-gray-200 px-3 py-2 text-sm" />
        <select name="status" defaultValue={status} className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {BOOKING_STATUSES.map((s) => (
            <option key={s} value={s}>{BOOKING_STATUS_LABELS[s]}</option>
          ))}
        </select>
        <button type="submit" className="rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white">Filter</button>
      </form>

      <BookingsTable
        bookings={data.items as IBooking[]}
        pagination={{
          page: data.page,
          totalPages: data.totalPages,
          basePath: '/admin/bookings',
          searchParams: searchParamsRecord,
        }}
      />
    </div>
  );
}
