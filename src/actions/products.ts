'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models';
import { slugify, omitUndefined } from '@/lib/utils';
import { productSchema, productUpdateSchema } from '@/validations/product';
import {
  actionError,
  actionSuccess,
  serialize,
  type ActionResult,
} from './helpers';

export async function createProduct(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const parsed = productSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const slug = parsed.data.slug || slugify(parsed.data.name);
    const existing = await Product.findOne({ slug });
    if (existing) {
      return actionError('A product with this slug already exists');
    }

    const product = await Product.create(
      omitUndefined({ ...parsed.data, slug }) as Record<string, unknown>
    );

    revalidatePath('/shop');
    revalidatePath('/admin/products');
    revalidatePath('/riwaaz');

    return actionSuccess({ id: product._id.toString() });
  } catch (error) {
    console.error('createProduct error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to create product'
    );
  }
}

export async function updateProduct(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = productUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    if (parsed.data.slug) {
      const existing = await Product.findOne({
        slug: parsed.data.slug,
        _id: { $ne: id },
      });
      if (existing) {
        return actionError('A product with this slug already exists');
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );

    if (!product) {
      return actionError('Product not found');
    }

    revalidatePath('/shop');
    revalidatePath(`/shop/${product.slug}`);
    revalidatePath('/admin/products');
    revalidatePath('/riwaaz');

    return actionSuccess(serialize(product));
  } catch (error) {
    console.error('updateProduct error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update product'
    );
  }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return actionError('Product not found');
    }

    revalidatePath('/shop');
    revalidatePath('/admin/products');
    revalidatePath('/riwaaz');

    return actionSuccess({ deleted: true });
  } catch (error) {
    console.error('deleteProduct error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to delete product'
    );
  }
}

export async function duplicateProduct(
  id: string
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    await connectDB();

    const original = await Product.findById(id).lean();
    if (!original) {
      return actionError('Product not found');
    }

    const { _id, createdAt, updatedAt, ...rest } = original;
    void _id;
    void createdAt;
    void updatedAt;

    const baseSlug = slugify(String(rest.name || 'product'));
    let slug = `${baseSlug}-copy`;
    let counter = 1;
    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-copy-${counter}`;
      counter += 1;
    }

    const duplicate = await Product.create({
      ...rest,
      name: `${rest.name} (Copy)`,
      slug,
      status: 'draft',
      isFeatured: false,
      isBestseller: false,
    });

    revalidatePath('/admin/products');

    return actionSuccess({ id: duplicate._id.toString() });
  } catch (error) {
    console.error('duplicateProduct error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to duplicate product'
    );
  }
}

export async function toggleProductStatus(
  id: string,
  status: 'draft' | 'published'
): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const product = await Product.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!product) {
      return actionError('Product not found');
    }

    revalidatePath('/shop');
    revalidatePath('/admin/products');

    return actionSuccess(serialize(product));
  } catch (error) {
    console.error('toggleProductStatus error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update product status'
    );
  }
}

export async function getAdminProduct(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const product = await Product.findById(id).lean();
    if (!product) {
      return actionError('Product not found');
    }

    return actionSuccess(serialize(product));
  } catch (error) {
    console.error('getAdminProduct error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to fetch product'
    );
  }
}
