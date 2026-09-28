import { getProducts, getCategories } from '@/lib/admin-data';
import { ProductsList } from '@/components/admin/ProductsList';

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search ?? '';
  const status = params.status ?? '';
  const category = params.category ?? '';
  const page = Number(params.page) || 1;

  const [data, categories] = await Promise.all([
    getProducts({ search, status: status || undefined, category: category || undefined, page }),
    getCategories(),
  ]);

  const searchParamsRecord: Record<string, string> = {};
  if (search) searchParamsRecord.search = search;
  if (status) searchParamsRecord.status = status;
  if (category) searchParamsRecord.category = category;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#241920]">Products</h1>
        <p className="text-sm text-gray-500">{data.total} products total</p>
      </div>
      <ProductsList
        data={data}
        searchParams={searchParamsRecord}
        categories={categories.map((c) => ({
          _id: String(c._id),
          name: c.name,
        }))}
      />
    </div>
  );
}
