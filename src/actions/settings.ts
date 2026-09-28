'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { SiteSettings } from '@/models';
import { siteSettingsSchema } from '@/validations/settings';
import {
  actionError,
  actionSuccess,
  serialize,
  type ActionResult,
} from './helpers';

export async function updateSiteSettings(
  input: unknown
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = siteSettingsSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: parsed.data },
      { new: true, upsert: true, runValidators: true }
    );

    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/admin/settings');

    return actionSuccess(serialize(settings));
  } catch (error) {
    console.error('updateSiteSettings error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update settings'
    );
  }
}

export async function getSiteSettings(): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const settings = await SiteSettings.findOne().lean();

    return actionSuccess(serialize(settings || {}));
  } catch (error) {
    console.error('getSiteSettings error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to fetch settings'
    );
  }
}
