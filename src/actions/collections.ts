'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Collection } from '@/models';
import { slugify } from '@/lib/utils';
import { collectionSchema } from '@/validations/product';
import {
  actionError,
  actionSuccess,
  serialize,
  type ActionResult,
} from './helpers';

export async function createCollection(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const parsed = collectionSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const slug = parsed.data.slug || slugify(parsed.data.name);
    const existing = await Collection.findOne({ slug });
    if (existing) {
      return actionError('A collection with this slug already exists');
    }

    const collection = await Collection.create({ ...parsed.data, slug });

    revalidatePath('/shop');
    revalidatePath('/riwaaz');
    revalidatePath('/admin/collections');

    return actionSuccess({ id: collection._id.toString() });
  } catch (error) {
    console.error('createCollection error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to create collection'
    );
  }
}

export async function updateCollection(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = collectionSchema.partial().safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    if (parsed.data.slug) {
      const existing = await Collection.findOne({
        slug: parsed.data.slug,
        _id: { $ne: id },
      });
      if (existing) {
        return actionError('A collection with this slug already exists');
      }
    }

    const collection = await Collection.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );

    if (!collection) {
      return actionError('Collection not found');
    }

    revalidatePath('/shop');
    revalidatePath('/riwaaz');
    revalidatePath('/admin/collections');

    return actionSuccess(serialize(collection));
  } catch (error) {
    console.error('updateCollection error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update collection'
    );
  }
}

export async function deleteCollection(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const collection = await Collection.findByIdAndDelete(id);
    if (!collection) {
      return actionError('Collection not found');
    }

    revalidatePath('/shop');
    revalidatePath('/riwaaz');
    revalidatePath('/admin/collections');

    return actionSuccess({ deleted: true });
  } catch (error) {
    console.error('deleteCollection error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to delete collection'
    );
  }
}
