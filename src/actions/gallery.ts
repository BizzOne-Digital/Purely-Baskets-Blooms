'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { GalleryItem } from '@/models';
import { galleryItemSchema } from '@/validations/settings';
import {
  actionError,
  actionSuccess,
  serialize,
  type ActionResult,
} from './helpers';

export async function createGalleryItem(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const parsed = galleryItemSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();
    const item = await GalleryItem.create(parsed.data);

    revalidatePath('/');
    revalidatePath('/admin/gallery');

    return actionSuccess({ id: item._id.toString() });
  } catch (error) {
    console.error('createGalleryItem error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to create gallery item'
    );
  }
}

export async function updateGalleryItem(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = galleryItemSchema.partial().safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();
    const item = await GalleryItem.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );

    if (!item) {
      return actionError('Gallery item not found');
    }

    revalidatePath('/');
    revalidatePath('/admin/gallery');

    return actionSuccess(serialize(item));
  } catch (error) {
    console.error('updateGalleryItem error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update gallery item'
    );
  }
}

export async function deleteGalleryItem(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const item = await GalleryItem.findByIdAndDelete(id);
    if (!item) {
      return actionError('Gallery item not found');
    }

    revalidatePath('/');
    revalidatePath('/admin/gallery');

    return actionSuccess({ deleted: true });
  } catch (error) {
    console.error('deleteGalleryItem error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to delete gallery item'
    );
  }
}

export async function reorderGalleryItems(
  orderedIds: string[]
): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    await Promise.all(
      orderedIds.map((itemId, index) =>
        GalleryItem.findByIdAndUpdate(itemId, { order: index })
      )
    );

    revalidatePath('/');
    revalidatePath('/admin/gallery');

    return actionSuccess({ reordered: true });
  } catch (error) {
    console.error('reorderGalleryItems error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to reorder gallery items'
    );
  }
}
