import { getCategories } from '@/lib/admin-data';
import { CategoriesManager } from '@/components/admin/CategoriesManager';
import type { ICategory } from '@/types';

export default async function CategoriesPage() {
  const items = await getCategories();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#241920]">Categories</h1>
        <p className="text-sm text-gray-500">Manage product categories</p>
      </div>
      <CategoriesManager items={items as ICategory[]} />
    </div>
  );
}
