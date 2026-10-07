import { Suspense } from "react";
import {
  getPublicProducts,
} from "@/lib/storefront";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { PageSection } from "@/components/layout/PageSection";
import { ShopHeroBanner } from "@/components/shop/ShopHeroBanner";
import { ShopOccasionPills } from "@/components/shop/ShopOccasionPills";
import { ShopSortBar } from "@/components/shop/ShopSortBar";
import { ShopPagination } from "@/components/shop/ShopPagination";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    collection?: string;
    occasion?: string;
    sort?: string;
    search?: string;
    page?: string;
  }>;
}

async function ShopContent({
  searchParams,
}: {
  searchParams: Awaited<ShopPageProps["searchParams"]>;
}) {
  const result = await getPublicProducts({
    category: searchParams.category,
    collection: searchParams.collection,
    occasion: searchParams.occasion,
    sort: searchParams.sort,
    search: searchParams.search,
    page: searchParams.page ? parseInt(searchParams.page, 10) : 1,
    pageSize: 12,
  });

  return (
    <>
      <ShopHeroBanner />

      <PageSection tone="plain" containerClassName="py-10 md:py-14">
        <div className="mb-8 grid w-full min-w-0 gap-4 border-b border-deep-ink/10 pb-6 sm:grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6">
          <Suspense fallback={<div className="h-10 min-w-0" />}>
            <ShopOccasionPills className="min-w-0 w-full" />
          </Suspense>
          <Suspense fallback={null}>
            <ShopSortBar />
          </Suspense>
        </div>

        <p className="mb-6 text-sm text-deep-ink/55">
          {result.total} {result.total === 1 ? "arrangement" : "arrangements"}
        </p>
        <ProductGrid products={result.items} />
        <Suspense fallback={null}>
          <ShopPagination page={result.page} totalPages={result.totalPages} />
        </Suspense>
      </PageSection>
    </>
  );
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ShopContent searchParams={params} />
    </Suspense>
  );
}
