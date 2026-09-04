import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Booking } from '@/models';
import {
  getClientIdentifier,
  rateLimit,
  createRateLimitResponse,
} from '@/lib/rate-limit';
import { sendBookingEmails } from '@/lib/email';
import { bookingSchema } from '@/validations/booking';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIdentifier(request.headers);
    const limit = rateLimit(`booking:${ip}`, {
      limit: 5,
      windowMs: 60_000,
    });

    if (!limit.success) {
      return createRateLimitResponse(limit.retryAfterMs ?? 60_000);
    }

    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.create(parsed.data);

    try {
      await sendBookingEmails(booking);
    } catch (emailError) {
      console.error('Booking API email error:', emailError);
    }

    return NextResponse.json({
      success: true,
      id: booking._id.toString(),
      message:
        'Your booking request has been received. We will contact you shortly.',
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit booking request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
