'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Testimonial } from '@/models';
import { testimonialSchema } from '@/validations/settings';
import {
  actionError,
  actionSuccess,
  serialize,
  type ActionResult,
} from './helpers';

export async function createTestimonial(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const parsed = testimonialSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();
    const testimonial = await Testimonial.create(parsed.data);

    revalidatePath('/');
    revalidatePath('/admin/testimonials');

    return actionSuccess({ id: testimonial._id.toString() });
  } catch (error) {
    console.error('createTestimonial error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to create testimonial'
    );
  }
}

export async function updateTestimonial(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = testimonialSchema.partial().safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return actionError('Testimonial not found');
    }

    revalidatePath('/');
    revalidatePath('/admin/testimonials');

    return actionSuccess(serialize(testimonial));
  } catch (error) {
    console.error('updateTestimonial error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update testimonial'
    );
  }
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return actionError('Testimonial not found');
    }

    revalidatePath('/');
    revalidatePath('/admin/testimonials');

    return actionSuccess({ deleted: true });
  } catch (error) {
    console.error('deleteTestimonial error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to delete testimonial'
    );
  }
}

export async function reorderTestimonials(
  orderedIds: string[]
): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    await Promise.all(
      orderedIds.map((testimonialId, index) =>
        Testimonial.findByIdAndUpdate(testimonialId, { order: index })
      )
    );

    revalidatePath('/');
    revalidatePath('/admin/testimonials');

    return actionSuccess({ reordered: true });
  } catch (error) {
    console.error('reorderTestimonials error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to reorder testimonials'
    );
  }
}
