import { getTestimonials } from '@/lib/admin-data';
import { TestimonialsManager } from '@/components/admin/TestimonialsManager';
import type { ITestimonial } from '@/types';

export default async function TestimonialsPage() {
  const items = await getTestimonials();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#241920]">Testimonials</h1>
        <p className="text-sm text-gray-500">Manage customer testimonials</p>
      </div>
      <TestimonialsManager items={items as ITestimonial[]} />
    </div>
  );
}
