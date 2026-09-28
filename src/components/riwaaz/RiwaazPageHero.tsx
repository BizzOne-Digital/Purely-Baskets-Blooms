import Link from "next/link";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Button } from "@/components/ui/Button";

const categories = [
  { title: "Bangle Bouquets & Trays", href: "/shop?collection=riwaaz" },
  { title: "Mehndi & Wedding", href: "/shop?collection=riwaaz" },
  { title: "Celebration Baskets", href: "/shop?collection=riwaaz" },
] as const;

export function RiwaazPageHero() {
  return (
    <section className="border-b border-deep-ink/10 bg-ivory">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center md:px-8 md:py-20">
        <DisplayHeading as="h1" size="page" className="text-deep-berry">
          The Riwaaz Collection
        </DisplayHeading>
        <p className="mt-6 text-sm leading-relaxed text-deep-ink/75 md:text-base">
          Riwaaz means tradition — and every culture, family, and individual has traditions worth
          celebrating. This collection honours them through meaningful, beautifully customized
          creations. Whatever your culture or tradition, we can customize something special for
          your celebration.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-deep-ink/70">
          In every Indian celebration, flowers symbolize purity, blessings, joy, and new beginnings.
          Products include bangle bouquets, sweets trays, potlis, and celebration baskets — fully
          tailored to your event, vision, and colours.
        </p>

        <ul className="mx-auto mt-8 flex max-w-lg flex-col gap-2 text-left sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          {categories.map((cat) => (
            <li key={cat.title} className="sm:flex-1 sm:min-w-[10rem] sm:max-w-[14rem]">
              <Link
                href={cat.href}
                className="block rounded-sm border border-deep-ink/12 bg-pure-white px-4 py-3 text-center text-sm font-semibold text-deep-berry transition-colors hover:border-deep-berry/35 hover:bg-blush/30"
              >
                {cat.title}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/booking" className="mt-8 inline-block">
          <Button size="lg">Share your vision →</Button>
        </Link>
        <Link
          href="/shop?collection=riwaaz"
          className="mt-4 block text-sm font-medium text-deep-berry underline underline-offset-4 hover:text-plum"
        >
          Browse all Riwaaz in the shop →
        </Link>
      </div>
    </section>
  );
}
