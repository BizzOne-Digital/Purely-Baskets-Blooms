import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

const MOMENTS = [
  {
    title: "Birthday Flowers",
    href: "/shop?occasion=Birthdays",
    image: "/home/occasion-birthdays.jpg",
    blurb: "Classic bouquets to unique arrangements — made for their day.",
  },
  {
    title: "Corporate Subscriptions",
    href: "/shop?occasion=Corporate",
    image: "/home/occasion-corporate.jpg",
    blurb: "Elevate your office or client gifting with recurring fresh florals.",
  },
  {
    title: "Sympathy",
    href: "/shop?occasion=Sympathy",
    image: "/products/sympathy-comfort.jpg",
    blurb: "Compassionate designs that express your condolences with care.",
  },
  {
    title: "The Riwaaz Collection",
    href: "/riwaaz",
    image: "/pages/riwaaz-hero.jpg",
    blurb: "Tradition, culture, and celebration — fully customized for you.",
  },
] as const;

export function HomeMomentsSection() {
  return (
    <section className="border-b border-deep-ink/10 bg-pure-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <DisplayHeading as="h2" size="section" className="text-deep-berry">
            Shop the collection
          </DisplayHeading>
          <div className="mx-auto mt-4 h-px w-16 bg-deep-berry/30" aria-hidden />
        </div>

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {MOMENTS.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="group block overflow-hidden rounded-sm border border-deep-ink/10 bg-pure-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flower-surface relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="border-t border-deep-ink/8 px-4 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-deep-berry">
                      {item.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-deep-berry/70 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-deep-ink/65">{item.blurb}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
