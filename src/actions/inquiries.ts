'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { ContactInquiry } from '@/models';
import { actionError, actionSuccess, serialize } from '@/actions/helpers';
import type { ContactInquiryStatus } from '@/types';

export async function updateInquiryStatus(
  id: string,
  status: ContactInquiryStatus,
  adminNotes?: string
) {
  try {
    await requireAdmin();
    await connectDB();

    const inquiry = await ContactInquiry.findByIdAndUpdate(
      id,
      {
        status,
        ...(adminNotes !== undefined && { adminNotes }),
      },
      { new: true, runValidators: true }
    );

    if (!inquiry) return actionError('Inquiry not found');

    revalidatePath('/admin/inquiries');
    return actionSuccess(serialize(inquiry));
  } catch (error) {
    return actionError(error instanceof Error ? error.message : 'Failed to update inquiry');
  }
}
