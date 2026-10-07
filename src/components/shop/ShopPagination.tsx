"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopPaginationProps {
  page: number;
  totalPages: number;
}

function shopPageHref(searchParams: URLSearchParams, page: number) {
  const params = new URLSearchParams(searchParams.toString());
  if (page <= 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }
  const query = params.toString();
  return query ? `/shop?${query}` : "/shop";
}

const navButtonClass =
  "inline-flex items-center gap-1.5 rounded-full border border-deep-ink/15 bg-pure-white px-4 py-2 text-sm font-medium text-deep-ink transition-colors hover:border-deep-berry/40 hover:text-deep-berry";

export function ShopPagination({ page, totalPages }: ShopPaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="mt-10 flex flex-col items-center gap-5 border-t border-deep-ink/10 pt-8"
      aria-label="Shop pages"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {page > 1 ? (
          <Link href={shopPageHref(searchParams, page - 1)} className={navButtonClass}>
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Previous
          </Link>
        ) : (
          <span
            className={cn(navButtonClass, "pointer-events-none opacity-40")}
            aria-disabled
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Previous
          </span>
        )}

        <div className="flex items-center gap-1 px-1">
          {pages.map((p) => {
            const active = p === page;
            return (
              <Link
                key={p}
                href={shopPageHref(searchParams, p)}
                className={cn(
                  "flex h-9 min-w-[2.25rem] items-center justify-center rounded-full px-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-deep-berry text-pure-white"
                    : "text-deep-ink/70 hover:bg-blush/40 hover:text-deep-berry"
                )}
                aria-current={active ? "page" : undefined}
              >
                {p}
              </Link>
            );
          })}
        </div>

        {page < totalPages ? (
          <Link href={shopPageHref(searchParams, page + 1)} className={navButtonClass}>
            Next
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : (
          <span
            className={cn(navButtonClass, "pointer-events-none opacity-40")}
            aria-disabled
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden />
          </span>
        )}
      </div>

      <p className="text-xs text-deep-ink/50">
        Page {page} of {totalPages}
      </p>
    </nav>
  );
}
