import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { NewsletterSubscriber } from '@/models';
import {
  getClientIdentifier,
  rateLimit,
  createRateLimitResponse,
} from '@/lib/rate-limit';
import { newsletterSchema } from '@/validations/contact';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIdentifier(request.headers);
    const limit = rateLimit(`newsletter:${ip}`, {
      limit: 10,
      windowMs: 60_000,
    });

    if (!limit.success) {
      return createRateLimitResponse(limit.retryAfterMs ?? 60_000);
    }

    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

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

    const email = parsed.data.email.toLowerCase();
    const existing = await NewsletterSubscriber.findOne({ email });

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        );
      }

      existing.isActive = true;
      existing.unsubscribedAt = undefined;
      await existing.save();

      return NextResponse.json({
        success: true,
        message: 'Welcome back! Your subscription has been reactivated.',
      });
    }

    await NewsletterSubscriber.create({ email, isActive: true });

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
