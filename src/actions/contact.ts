'use server';

import { connectDB } from '@/lib/mongodb';
import { ContactInquiry } from '@/models';
import {
  sendEmail,
  buildContactConfirmationEmail,
  buildContactNotificationEmail,
} from '@/lib/email';
import { contactSchema } from '@/validations/contact';
import { actionError, actionSuccess, type ActionResult } from './helpers';

export async function submitContactForm(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    const parsed = contactSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
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
      console.error('Contact email error:', emailError);
    }

    return actionSuccess({ id: inquiry._id.toString() });
  } catch (error) {
    console.error('submitContactForm error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to submit contact form'
    );
  }
}
