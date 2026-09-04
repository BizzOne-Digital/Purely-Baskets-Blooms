import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ContactInquiry } from '@/models';
import {
  getClientIdentifier,
  rateLimit,
  createRateLimitResponse,
} from '@/lib/rate-limit';
import {
  sendEmail,
  buildContactConfirmationEmail,
  buildContactNotificationEmail,
} from '@/lib/email';
import { contactSchema } from '@/validations/contact';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIdentifier(request.headers);
    const limit = rateLimit(`contact:${ip}`, {
      limit: 5,
      windowMs: 60_000,
    });

    if (!limit.success) {
      return createRateLimitResponse(limit.retryAfterMs ?? 60_000);
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

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

    const inquiry = await ContactInquiry.create({
      ...parsed.data,
      status: 'new',
    });

    try {
      const adminNotification = buildContactNotificationEmail(inquiry);
      const customerConfirmation = buildContactConfirmationEmail(inquiry);
      const adminEmail =
        process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;

      if (adminEmail) {
        await sendEmail({
          to: adminEmail,
          subject: adminNotification.subject,
          html: adminNotification.html,
          text: adminNotification.text,
          replyTo: inquiry.email,
        });
      }

      await sendEmail({
        to: inquiry.email,
        subject: customerConfirmation.subject,
        html: customerConfirmation.html,
        text: customerConfirmation.text,
      });
    } catch (emailError) {
      console.error('Contact API email error:', emailError);
    }

    return NextResponse.json({
      success: true,
      id: inquiry._id.toString(),
      message: 'Thank you for your message. We will be in touch soon.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
