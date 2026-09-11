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
        <div className="mb-8 flex min-w-0 w-full flex-col gap-4 border-b border-champagne/30 pb-6 md:flex-row md:items-center md:justify-between">
          <Suspense fallback={<div className="h-10" />}>
            <ShopOccasionPills />
          </Suspense>
          <Suspense fallback={null}>
            <ShopSortBar className="shrink-0" />
          </Suspense>
        </div>

        <p className="mb-6 text-sm text-cream/55">
          {result.total} {result.total === 1 ? "arrangement" : "arrangements"}
        </p>
        <ProductGrid products={result.items} />
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
