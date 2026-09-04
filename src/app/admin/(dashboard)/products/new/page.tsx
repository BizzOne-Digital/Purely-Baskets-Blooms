import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getCategories, getCollections } from '@/lib/admin-data';
import { ProductForm } from '@/components/admin/ProductForm';

export default async function NewProductPage() {
  const [categories, collections] = await Promise.all([
    getCategories(),
    getCollections(),
  ]);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="mb-2 inline-flex items-center gap-1 text-sm text-[#7A2048] hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="text-xl font-semibold text-[#241920]">New Product</h1>
      </div>
      <ProductForm categories={categories} collections={collections} />
    </div>
  );
}
