"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { cn } from "@/lib/utils";

const SHOP_FILTERS = [
  { label: "All", occasion: null as string | null, collection: null as string | null },
  { label: "Birthday Flowers", occasion: "Birthdays", collection: null },
  { label: "Corporate Subscriptions", occasion: "Corporate", collection: null },
  { label: "Sympathy", occasion: "Sympathy", collection: null },
  { label: "Riwaaz Collection", occasion: null, collection: "riwaaz" },
] as const;

export function ShopOccasionPills({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentOccasion = searchParams.get("occasion");
  const currentCollection = searchParams.get("collection");

  const selectFilter = useCallback(
    (occasion: string | null, collection: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("occasion");
      params.delete("collection");
      if (occasion) params.set("occasion", occasion);
      if (collection) params.set("collection", collection);
      params.delete("page");
      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  return (
    <div
      className={cn(
        "min-w-0 w-full overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden",
        isPending && "opacity-70",
        className
      )}
    >
      <div className="flex w-max max-w-full flex-row flex-nowrap items-center gap-2 md:w-auto md:max-w-none md:flex-wrap">
        {SHOP_FILTERS.map((filter) => {
          const active =
            (filter.occasion === null &&
              filter.collection === null &&
              !currentOccasion &&
              !currentCollection) ||
            (filter.occasion && currentOccasion === filter.occasion) ||
            (filter.collection && currentCollection === filter.collection);

          return (
            <button
              key={filter.label}
              type="button"
              onClick={() => selectFilter(filter.occasion, filter.collection)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors sm:px-4 sm:text-xs sm:tracking-[0.1em]",
                active
                  ? "border-deep-berry bg-deep-berry text-pure-white"
                  : "border-deep-ink/15 bg-pure-white text-deep-ink/75 hover:border-deep-berry/40 hover:text-deep-berry"
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
