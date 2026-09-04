'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Mail, Phone } from 'lucide-react';
import { updateBookingStatus, addBookingNote } from '@/actions/bookings';
import { StatusBadge } from './StatusBadge';
import { formatPhoneNumber } from '@/lib/utils';
import {
  BOOKING_STATUSES,
  BOOKING_STATUS_LABELS,
  SERVICE_TYPES,
  BUDGET_RANGES,
} from '@/lib/constants';
import type { IBooking, BookingStatus } from '@/types';

interface BookingDetailProps {
  booking: IBooking;
}

export function BookingDetail({ booking }: BookingDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState<BookingStatus>(booking.status);
  const [adminNotes, setAdminNotes] = useState(booking.adminNotes ?? '');
  const [newNote, setNewNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  const serviceLabel =
    SERVICE_TYPES.find((s) => s.value === booking.serviceType)?.label ??
    booking.serviceType;
  const budgetLabel =
    BUDGET_RANGES.find((b) => b.value === booking.budgetRange)?.label;

  const handleStatusUpdate = async () => {
    setSaving(true);
    const result = await updateBookingStatus(String(booking._id), {
      status,
      adminNotes: adminNotes || undefined,
    });
    setSaving(false);

    if (result.success) {
      toast.success('Booking status updated');
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to update status');
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    setAddingNote(true);
    const result = await addBookingNote(String(booking._id), newNote);
    setAddingNote(false);

    if (result.success) {
      toast.success('Note added');
      setNewNote('');
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to add note');
    }
  };

  const inputClass =
    'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#7A2048] focus:outline-none focus:ring-1 focus:ring-[#7A2048]';
  const cardClass = 'rounded-xl border border-[#F5D6DC]/60 bg-white p-5';

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <div className={cardClass}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#7A2048]">Request Details</h2>
            <StatusBadge status={booking.status} />
          </div>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-gray-500">Service Type</dt>
              <dd className="font-medium">{serviceLabel}</dd>
            </div>
            {booking.occasion && (
              <div>
                <dt className="text-gray-500">Occasion</dt>
                <dd className="font-medium">{booking.occasion}</dd>
              </div>
            )}
            {booking.eventDate && (
              <div>
                <dt className="text-gray-500">Event Date</dt>
                <dd className="font-medium">
                  {new Date(booking.eventDate).toLocaleDateString('en-CA')}
                </dd>
              </div>
            )}
            {booking.eventLocation && (
              <div>
                <dt className="text-gray-500">Location</dt>
                <dd className="font-medium">{booking.eventLocation}</dd>
              </div>
            )}
            {booking.estimatedGuestCount && (
              <div>
                <dt className="text-gray-500">Guest Count</dt>
                <dd className="font-medium">{booking.estimatedGuestCount}</dd>
              </div>
            )}
            {budgetLabel && (
              <div>
                <dt className="text-gray-500">Budget</dt>
                <dd className="font-medium">{budgetLabel}</dd>
              </div>
            )}
            {booking.preferredColors && (
              <div>
                <dt className="text-gray-500">Preferred Colors</dt>
                <dd className="font-medium">{booking.preferredColors}</dd>
              </div>
            )}
            {booking.floralStyle && (
              <div>
                <dt className="text-gray-500">Floral Style</dt>
                <dd className="font-medium">{booking.floralStyle}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className={cardClass}>
          <h2 className="mb-3 text-base font-semibold text-[#7A2048]">Message</h2>
          <p className="whitespace-pre-wrap text-sm text-gray-700">{booking.message}</p>
          {booking.specialRequirements && (
            <div className="mt-4 rounded-lg bg-[#FFF9F4] p-3">
              <p className="text-xs font-medium text-[#7A2048]">Special Requirements</p>
              <p className="mt-1 text-sm text-gray-600">{booking.specialRequirements}</p>
            </div>
          )}
          {booking.productsOrServices && (
            <div className="mt-4">
              <p className="text-xs font-medium text-[#7A2048]">Products/Services</p>
              <p className="mt-1 text-sm text-gray-600">{booking.productsOrServices}</p>
            </div>
          )}
        </div>

        {booking.inspirationImages.length > 0 && (
          <div className={cardClass}>
            <h2 className="mb-4 text-base font-semibold text-[#7A2048]">Inspiration Images</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {booking.inspirationImages.map((img) => (
                <div
                  key={img.publicId}
                  className="relative aspect-square overflow-hidden rounded-lg border border-[#F5D6DC]"
                >
                  <Image src={img.url} alt={img.alt ?? ''} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className={cardClass}>
          <h2 className="mb-4 text-base font-semibold text-[#7A2048]">Customer</h2>
          <div className="space-y-3 text-sm">
            <p className="font-medium text-[#241920]">{booking.customerName}</p>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4 text-[#7A2048]" />
              <a href={`mailto:${booking.customerEmail}`} className="hover:underline">
                {booking.customerEmail}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4 text-[#7A2048]" />
              {formatPhoneNumber(booking.customerPhone)}
            </div>
            <p className="text-xs text-gray-500 capitalize">
              Prefers contact via {booking.preferredContactMethod}
            </p>
            <p className="text-xs text-gray-400">
              Submitted {new Date(booking.createdAt).toLocaleString('en-CA')}
            </p>
          </div>
        </div>

        <div className={cardClass}>
          <h2 className="mb-4 text-base font-semibold text-[#7A2048]">Update Status</h2>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as BookingStatus)}
            className={inputClass}
          >
            {BOOKING_STATUSES.map((s) => (
              <option key={s} value={s}>
                {BOOKING_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Admin notes..."
            rows={4}
            className={`${inputClass} mt-3`}
          />
          <button
            type="button"
            onClick={handleStatusUpdate}
            disabled={saving}
            className="mt-3 w-full rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white hover:bg-[#481936] disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Status'}
          </button>
        </div>

        <div className={cardClass}>
          <h2 className="mb-3 text-base font-semibold text-[#7A2048]">Add Note</h2>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a timestamped note..."
            rows={3}
            className={inputClass}
          />
          <button
            type="button"
            onClick={handleAddNote}
            disabled={addingNote || !newNote.trim()}
            className="mt-3 w-full rounded-lg border border-[#7A2048] px-4 py-2 text-sm font-medium text-[#7A2048] hover:bg-[#FFF9F4] disabled:opacity-50"
          >
            {addingNote ? 'Adding...' : 'Add Note'}
          </button>
        </div>
      </div>
    </div>
  );
}
