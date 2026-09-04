import Link from "next/link";
import { HOME_CATEGORIES } from "@/lib/home-content";
import { LotusMark } from "@/components/editorial/LotusMark";

export function HomeCategoryStrip() {
  return (
    <div className="overflow-x-hidden border-y border-deep-berry/20 bg-deep-berry py-3.5">
      <div className="mx-auto flex max-w-7xl min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-2 px-4 text-center md:gap-x-3 md:px-8">
        <LotusMark size="sm" className="hidden text-champagne sm:inline" />
        {HOME_CATEGORIES.map((item, index) => (
          <span key={item} className="inline-flex items-center gap-3">
            {index > 0 ? <span className="text-champagne/50">•</span> : null}
            <Link
              href={`/shop?occasion=${encodeURIComponent(item)}`}
              className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ivory/90 transition-colors hover:text-champagne sm:text-xs sm:tracking-[0.22em]"
            >
              {item}
            </Link>
          </span>
        ))}
        <LotusMark size="sm" className="hidden text-champagne sm:inline" />
      </div>
    </div>
  );
}
