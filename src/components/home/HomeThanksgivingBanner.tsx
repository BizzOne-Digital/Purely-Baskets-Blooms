import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HomeThanksgivingBanner() {
  return (
    <section
      className="relative w-full overflow-hidden border-b border-amber-900/15 bg-gradient-to-r from-amber-50 via-orange-50/90 to-amber-100/80"
      aria-label="Thanksgiving"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-center md:flex-row md:px-8 md:py-6 md:text-left">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-900/80">
            Thanksgiving
          </p>
          <p className="mt-1 font-display text-lg font-semibold text-neutral-950 md:text-xl">
            Grateful gatherings deserve blooms that feel like home.
          </p>
          <p className="mt-1 text-sm text-neutral-800">
            Order at least 48 hours ahead — custom centrepieces and host gifts welcome.
          </p>
        </div>
        <Link href="/customize" className="shrink-0">
          <Button size="md" className="bg-amber-900 hover:bg-amber-950">
            Plan your table →
          </Button>
        </Link>
      </div>
    </section>
  );
}
