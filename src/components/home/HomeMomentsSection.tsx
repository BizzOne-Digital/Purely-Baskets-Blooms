import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

const MOMENTS = [
  {
    title: "Occasion Flowers",
    href: "/shop?occasion=Birthdays",
    image: "/home/occasion-birthdays.jpg",
  },
  {
    title: "Gift Baskets",
    href: "/shop",
    image: "/products/golden-hour-basket.jpg",
  },
  {
    title: "Sacred Spaces",
    href: "/shop?occasion=Sympathy",
    image: "/home/occasion-weddings.jpg",
  },
] as const;

export function HomeMomentsSection() {
  return (
    <section className="border-b border-deep-ink/10 bg-pure-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <DisplayHeading as="h2" size="section" className="text-deep-berry">
            Made for your moments
          </DisplayHeading>
          <div className="mx-auto mt-4 h-px w-12 bg-marigold/60" aria-hidden />
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {MOMENTS.map((item) => (
            <li key={item.title}>
              <Link href={item.href} className="group block overflow-hidden bg-ivory/80">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-deep-ink/8 bg-ivory px-5 py-4">
                  <span className="font-display text-lg font-semibold text-deep-berry">
                    {item.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-deep-berry/70 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
