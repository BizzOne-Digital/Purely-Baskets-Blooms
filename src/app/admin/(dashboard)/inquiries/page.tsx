import { getInquiries } from '@/lib/admin-data';
import { InquiriesList } from '@/components/admin/InquiriesList';

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function InquiriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search ?? '';
  const status = params.status ?? '';
  const page = Number(params.page) || 1;

  const data = await getInquiries({ search, status: status || undefined, page });

  const searchParamsRecord: Record<string, string> = {};
  if (search) searchParamsRecord.search = search;
  if (status) searchParamsRecord.status = status;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#241920]">Contact Inquiries</h1>
        <p className="text-sm text-gray-500">{data.total} inquiries total</p>
      </div>
      <InquiriesList data={data} searchParams={searchParamsRecord} />
    </div>
  );
}
