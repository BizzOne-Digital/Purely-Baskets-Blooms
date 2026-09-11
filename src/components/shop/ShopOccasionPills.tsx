"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { cn } from "@/lib/utils";

const SHOP_OCCASIONS = [
  "All",
  "Birthdays",
  "Anniversaries",
  "Corporate",
  "Sympathy",
  "Just Because",
] as const;

export function ShopOccasionPills({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const current = searchParams.get("occasion") ?? "All";

  const selectOccasion = useCallback(
    (occasion: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (occasion === "All") {
        params.delete("occasion");
      } else {
        params.set("occasion", occasion);
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
        "flex flex-wrap items-center gap-2",
        isPending && "opacity-70",
        className
      )}
    >
      {SHOP_OCCASIONS.map((occasion) => {
        const active = current === occasion || (occasion === "All" && !searchParams.get("occasion"));
        return (
          <button
            key={occasion}
            type="button"
            onClick={() => selectOccasion(occasion)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300",
              active
                ? "border-gold bg-gold text-carbon shadow-md shadow-gold/20"
                : "border-gold/25 bg-carbon-elevated text-cream/75 hover:border-gold/45 hover:bg-carbon-soft hover:text-gold-light"
            )}
          >
            {occasion === "Birthdays" ? "Birthday" : occasion}
          </button>
        );
      })}
    </div>
  );
}
