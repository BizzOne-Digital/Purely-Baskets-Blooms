'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/mongodb';
import { Booking } from '@/models';
import { sendBookingEmails } from '@/lib/email';
import { customizeSchema } from '@/validations/customize';
import { actionError, actionSuccess, type ActionResult } from './helpers';

function buildCustomizeMessage(input: {
  occasion: string;
  eventLocation: string;
  preferredColors?: string;
  floralStyle?: string;
  referenceNotes?: string;
  message: string;
  inspirationCount: number;
}): string {
  const lines = [
    `[Customize request]`,
    `Occasion: ${input.occasion}`,
    `Location: ${input.eventLocation}`,
  ];

  if (input.preferredColors?.trim()) {
    lines.push(`Colours: ${input.preferredColors.trim()}`);
  }
  if (input.floralStyle?.trim()) {
    lines.push(`Style: ${input.floralStyle.trim()}`);
  }
  if (input.referenceNotes?.trim()) {
    lines.push(`Reference notes: ${input.referenceNotes.trim()}`);
  }
  if (input.inspirationCount > 0) {
    lines.push(`Reference images attached: ${input.inspirationCount}`);
  }

  lines.push('', input.message.trim());

  return lines.join('\n');
}

export async function submitCustomizeRequest(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    const parsed = customizeSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    const data = parsed.data;

    await connectDB();

    const booking = await Booking.create({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      serviceType: 'custom_floral',
      occasion: data.occasion,
      eventDate: data.eventDate,
      eventLocation: data.eventLocation,
      preferredColors: data.preferredColors,
      floralStyle: data.floralStyle,
      inspirationImages: data.inspirationImages,
      message: buildCustomizeMessage({
        occasion: data.occasion,
        eventLocation: data.eventLocation,
        preferredColors: data.preferredColors,
        floralStyle: data.floralStyle,
        referenceNotes: data.referenceNotes,
        message: data.message,
        inspirationCount: data.inspirationImages.length,
      }),
      specialRequirements: data.referenceNotes,
      preferredContactMethod: data.preferredContactMethod,
    });

    try {
      await sendBookingEmails(booking);
    } catch (emailError) {
      console.error('Customize request email error:', emailError);
    }

    revalidatePath('/admin/bookings');

    return actionSuccess({ id: booking._id.toString() });
  } catch (error) {
    console.error('submitCustomizeRequest error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to submit customize request'
    );
  }
}
