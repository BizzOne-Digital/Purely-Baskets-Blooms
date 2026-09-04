'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/models';
import { slugify } from '@/lib/utils';
import { categorySchema } from '@/validations/product';
import {
  actionError,
  actionSuccess,
  serialize,
  type ActionResult,
} from './helpers';

export async function createCategory(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const parsed = categorySchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const slug = parsed.data.slug || slugify(parsed.data.name);
    const existing = await Category.findOne({ slug });
    if (existing) {
      return actionError('A category with this slug already exists');
    }

    const category = await Category.create({ ...parsed.data, slug });

    revalidatePath('/shop');
    revalidatePath('/admin/categories');

    return actionSuccess({ id: category._id.toString() });
  } catch (error) {
    console.error('createCategory error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to create category'
    );
  }
}

export async function updateCategory(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = categorySchema.partial().safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    if (parsed.data.slug) {
      const existing = await Category.findOne({
        slug: parsed.data.slug,
        _id: { $ne: id },
      });
      if (existing) {
        return actionError('A category with this slug already exists');
      }
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );

    if (!category) {
      return actionError('Category not found');
    }

    revalidatePath('/shop');
    revalidatePath('/admin/categories');

    return actionSuccess(serialize(category));
  } catch (error) {
    console.error('updateCategory error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update category'
    );
  }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return actionError('Category not found');
    }

    revalidatePath('/shop');
    revalidatePath('/admin/categories');

    return actionSuccess({ deleted: true });
  } catch (error) {
    console.error('deleteCategory error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to delete category'
    );
  }
}
