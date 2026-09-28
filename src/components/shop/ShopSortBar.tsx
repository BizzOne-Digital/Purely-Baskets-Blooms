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
    <div
      className={cn(
        "flex w-full shrink-0 flex-row items-center justify-start gap-2 md:w-auto md:justify-end",
        isPending && "opacity-70",
        className
      )}
    >
      <label
        htmlFor="shop-sort"
        className="shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-deep-ink/55"
      >
        Sort by:
      </label>
      <select
        id="shop-sort"
        value={currentSort}
        onChange={(e) => onSort(e.target.value)}
        className="min-w-[10.5rem] max-w-full rounded-full border border-deep-ink/15 bg-pure-white px-4 py-2 text-sm text-deep-ink focus:border-deep-berry focus:outline-none focus:ring-1 focus:ring-deep-berry/30"
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
