import Image from "next/image";
import Link from "next/link";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Button } from "@/components/ui/Button";

export function SympathyPageContent() {
  return (
    <>
      <section className="border-b border-deep-ink/10 bg-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:px-8 md:py-20">
          <div>
            <DisplayHeading as="h1" size="page" className="text-neutral-950">
              Sympathy &amp; Funeral Flowers
            </DisplayHeading>
            <p className="mt-6 text-sm leading-relaxed text-neutral-800 md:text-base">
              When words are hard to find, flowers offer a thoughtful expression of love, comfort
              and remembrance. Whether you choose a heartfelt bouquet, an arrangement for the
              family&apos;s home or a floral tribute for a funeral or memorial service, Purely
              Baskets &amp; Blooms creates each piece with care.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base">
              We&apos;ll help you select flowers that honour a cherished life and let loved ones
              know they&apos;re in your thoughts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button size="lg">Contact us to arrange a tribute</Button>
              </Link>
              <Link href="/shop?occasion=Sympathy">
                <Button size="lg" variant="outline">Shop sympathy flowers</Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-deep-ink/10 bg-pure-white">
            <Image
              src="/pages/sympathy/funeral-tribute.jpg"
              alt="Sympathy floral tributes and funeral arrangements"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
