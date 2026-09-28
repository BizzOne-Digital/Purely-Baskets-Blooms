import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getAdminBooking } from '@/actions/bookings';
import { BookingDetail } from '@/components/admin/BookingDetail';
import type { IBooking } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getAdminBooking(id);

  if (!result.success || !result.data) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/bookings" className="mb-2 inline-flex items-center gap-1 text-sm text-[#7A2048] hover:underline">
          <ChevronLeft className="h-4 w-4" />
          Back to Bookings
        </Link>
        <h1 className="text-xl font-semibold text-[#241920]">Booking Request</h1>
        <p className="text-sm text-gray-500">{(result.data as IBooking).customerName}</p>
      </div>
      <BookingDetail booking={result.data as IBooking} />
    </div>
  );
}
