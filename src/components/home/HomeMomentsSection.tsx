import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

const MOMENTS = [
  { title: "Occasion Flowers", href: "/shop?occasion=Birthdays" },
  { title: "Gift Baskets", href: "/shop" },
  { title: "Sacred Spaces", href: "/shop?occasion=Sympathy" },
] as const;

export function HomeMomentsSection() {
  return (
    <section className="w-full max-w-full overflow-x-hidden border-b border-deep-ink/10 bg-pure-white py-14 md:py-20">
      <div className="mx-auto min-w-0 w-full max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <DisplayHeading as="h2" size="section" className="text-deep-berry">
            Made for your moments
          </DisplayHeading>
          <div className="mx-auto mt-4 h-px w-12 bg-marigold/60" aria-hidden />
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {MOMENTS.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="group flex items-center justify-between rounded-sm border border-deep-ink/10 bg-ivory/80 px-5 py-6 transition-colors hover:border-deep-berry/30 hover:bg-blush/25"
              >
                <span className="font-display text-lg font-semibold text-deep-berry">
                  {item.title}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-deep-berry/70 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
