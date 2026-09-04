import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getAdminProduct } from '@/actions/products';
import { getCategories, getCollections } from '@/lib/admin-data';
import { ProductForm } from '@/components/admin/ProductForm';
import type { IProduct } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const [result, categories, collections] = await Promise.all([
    getAdminProduct(id),
    getCategories(),
    getCollections(),
  ]);

  if (!result.success || !result.data) {
    notFound();
  }

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
        <h1 className="text-xl font-semibold text-[#241920]">Edit Product</h1>
        <p className="text-sm text-gray-500">{(result.data as IProduct).name}</p>
      </div>
      <ProductForm
        product={result.data as IProduct}
        categories={categories}
        collections={collections}
      />
    </div>
  );
}
