'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Booking } from '@/models';
import { sendBookingEmails } from '@/lib/email';
import { bookingSchema, bookingStatusUpdateSchema } from '@/validations/booking';
import {
  actionError,
  actionSuccess,
  serialize,
  type ActionResult,
} from './helpers';

export async function createBooking(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    const parsed = bookingSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const booking = await Booking.create(parsed.data);

    try {
      await sendBookingEmails(booking);
    } catch (emailError) {
      console.error('Booking email error:', emailError);
    }

    revalidatePath('/admin/bookings');

    return actionSuccess({ id: booking._id.toString() });
  } catch (error) {
    console.error('createBooking error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to submit booking request'
    );
  }
}

export async function updateBookingStatus(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = bookingStatusUpdateSchema.safeParse({
      bookingId: id,
      ...(typeof input === 'object' && input !== null ? input : {}),
    });
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        status: parsed.data.status,
        ...(parsed.data.adminNotes && { adminNotes: parsed.data.adminNotes }),
      },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return actionError('Booking not found');
    }

    revalidatePath('/admin/bookings');
    revalidatePath(`/admin/bookings/${id}`);

    return actionSuccess(serialize(booking));
  } catch (error) {
    console.error('updateBookingStatus error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update booking'
    );
  }
}

export async function addBookingNote(
  id: string,
  note: string
): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!note?.trim()) {
      return actionError('Note cannot be empty');
    }

    await connectDB();

    const booking = await Booking.findById(id);
    if (!booking) {
      return actionError('Booking not found');
    }

    const existingNotes = booking.adminNotes?.trim();
    booking.adminNotes = existingNotes
      ? `${existingNotes}\n\n${new Date().toISOString()}: ${note.trim()}`
      : note.trim();
    await booking.save();

    revalidatePath(`/admin/bookings/${id}`);

    return actionSuccess(serialize(booking));
  } catch (error) {
    console.error('addBookingNote error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to add note'
    );
  }
}

export async function getAdminBooking(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const booking = await Booking.findById(id).lean();
    if (!booking) {
      return actionError('Booking not found');
    }

    return actionSuccess(serialize(booking));
  } catch (error) {
    console.error('getAdminBooking error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to fetch booking'
    );
  }
}
