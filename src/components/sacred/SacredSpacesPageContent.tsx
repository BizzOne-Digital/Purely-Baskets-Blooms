import Image from "next/image";
import Link from "next/link";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Button } from "@/components/ui/Button";

export function SacredSpacesPageContent() {
  return (
    <section className="border-b border-deep-ink/10 bg-ivory">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:px-8 md:py-20">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-sm border border-deep-ink/10 bg-pure-white md:order-1">
          <Image
            src="/pages/sacred/church-flowers.jpg"
            alt="Fresh floral arrangement in a bright sacred space"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="order-1 md:order-2">
          <DisplayHeading as="h1" size="page" className="text-neutral-950">
            Flowers for Sacred Spaces
          </DisplayHeading>
          <p className="mt-6 text-sm leading-relaxed text-neutral-800 md:text-base">
            We create thoughtfully designed fresh floral arrangements for churches, prayer halls,
            and sacred spaces, honoring the beauty and spiritual significance of each setting.
            Every installation is crafted with care, reverence, and intention — enhancing worship,
            reflection, and celebration throughout the liturgical year and special occasions.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base">
            From altar arrangements and seasonal displays to bespoke floral installations, our work
            is designed to complement the architecture, symbolism, and sacred purpose of your
            space.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base">
            As part of our commitment to serve our communities, a portion of proceeds from every
            sacred space installation is donated back to support your ministry and service
            initiatives.
          </p>
          <Link href="/contact" className="mt-8 inline-block">
            <Button size="lg">Discuss your space →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
