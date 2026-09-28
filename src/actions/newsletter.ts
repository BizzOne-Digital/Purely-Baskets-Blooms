'use server';

import { connectDB } from '@/lib/mongodb';
import { NewsletterSubscriber } from '@/models';
import { newsletterSchema } from '@/validations/contact';
import { actionError, actionSuccess, type ActionResult } from './helpers';

export async function subscribeNewsletter(
  input: unknown
): Promise<ActionResult> {
  try {
    const parsed = newsletterSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const email = parsed.data.email.toLowerCase();
    const existing = await NewsletterSubscriber.findOne({ email });

    if (existing) {
      if (existing.isActive) {
        return actionError('This email is already subscribed');
      }

      existing.isActive = true;
      existing.unsubscribedAt = undefined;
      await existing.save();

      return actionSuccess({ subscribed: true, reactivated: true });
    }

    await NewsletterSubscriber.create({ email, isActive: true });

    return actionSuccess({ subscribed: true });
  } catch (error) {
    console.error('subscribeNewsletter error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to subscribe'
    );
  }
}

export async function unsubscribeNewsletter(email: string): Promise<ActionResult> {
  try {
    if (!email?.trim()) {
      return actionError('Email is required');
    }

    await connectDB();

    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { isActive: false, unsubscribedAt: new Date() },
      { new: true }
    );

    if (!subscriber) {
      return actionError('Email not found');
    }

    return actionSuccess({ unsubscribed: true });
  } catch (error) {
    console.error('unsubscribeNewsletter error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to unsubscribe'
    );
  }
}
