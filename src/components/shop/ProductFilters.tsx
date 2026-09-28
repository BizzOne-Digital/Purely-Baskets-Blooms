"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { OCCASIONS, SORT_OPTIONS } from "@/lib/constants";
import type { SerializedCategory, SerializedCollection } from "@/lib/storefront";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  categories: SerializedCategory[];
  collections: SerializedCollection[];
  className?: string;
}

export function ProductFilters({ categories, collections, className }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  const currentCategory = searchParams.get("category") ?? "";
  const currentCollection = searchParams.get("collection") ?? "";
  const currentOccasion = searchParams.get("occasion") ?? "";
  const currentSort = searchParams.get("sort") ?? "featured";

  return (
    <div
      className={cn(
        "space-y-6 rounded-2xl glass-panel border border-champagne/30 p-5",
        isPending && "opacity-70",
        className
      )}
    >
      <div className="flex items-center gap-2 text-deep-berry">
        <SlidersHorizontal className="h-4 w-4" />
        <h2 className="text-xs font-medium uppercase tracking-[0.2em]">Refine</h2>
      </div>

      <Select
        label="Category"
        value={currentCategory}
        onChange={(e) => updateParam("category", e.target.value)}
        options={[
          { value: "", label: "All Categories" },
          ...categories.map((c) => ({ value: c.slug, label: c.name })),
        ]}
      />

      <Select
        label="Collection"
        value={currentCollection}
        onChange={(e) => updateParam("collection", e.target.value)}
        options={[
          { value: "", label: "All Collections" },
          ...collections.map((c) => ({ value: c.slug, label: c.name })),
        ]}
      />

      <Select
        label="Occasion"
        value={currentOccasion}
        onChange={(e) => updateParam("occasion", e.target.value)}
        options={[
          { value: "", label: "All Occasions" },
          ...OCCASIONS.map((o) => ({ value: o, label: o })),
        ]}
      />

      <Select
        label="Sort By"
        value={currentSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        options={SORT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
      />
    </div>
  );
}
