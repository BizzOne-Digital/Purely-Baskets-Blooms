"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { SORT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ShopSortBar({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentSort = searchParams.get("sort") ?? "featured";

  const onSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "featured") {
        params.set("sort", value);
      } else {
        params.delete("sort");
      }
      params.delete("page");
      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  return (
    <div className={cn("flex items-center gap-2", isPending && "opacity-70", className)}>
      <label htmlFor="shop-sort" className="text-xs font-medium uppercase tracking-[0.14em] text-cream/60">
        Sort by:
      </label>
      <select
        id="shop-sort"
        value={currentSort}
        onChange={(e) => onSort(e.target.value)}
        className="rounded-full border border-gold/25 bg-carbon-elevated px-4 py-2 text-sm text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
