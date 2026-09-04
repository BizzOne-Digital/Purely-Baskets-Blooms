import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getOrder } from '@/lib/admin-data';
import { OrderDetail } from '@/components/admin/OrderDetail';
import type { IOrder } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/orders"
          className="mb-2 inline-flex items-center gap-1 text-sm text-[#7A2048] hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Orders
        </Link>
        <h1 className="text-xl font-semibold text-[#241920]">
          Order {(order as IOrder).orderNumber}
        </h1>
      </div>
      <OrderDetail order={order as IOrder} />
    </div>
  );
}
