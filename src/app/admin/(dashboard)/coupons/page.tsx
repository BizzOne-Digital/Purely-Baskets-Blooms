import { getCoupons } from '@/lib/admin-data';
import { CouponsList } from '@/components/admin/CouponsList';

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function CouponsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search ?? '';
  const page = Number(params.page) || 1;
  const data = await getCoupons({ search, page });

  const searchParamsRecord: Record<string, string> = {};
  if (search) searchParamsRecord.search = search;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#241920]">Coupons</h1>
        <p className="text-sm text-gray-500">{data.total} coupons total</p>
      </div>
      <CouponsList data={data} searchParams={searchParamsRecord} />
    </div>
  );
}
