import Image from "next/image";
import Link from "next/link";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { BUSINESS_SUBSCRIPTIONS_INTRO } from "@/lib/business-subscriptions-content";

export function ShopCorporateSubscriptionsIntro() {
  const intro = BUSINESS_SUBSCRIPTIONS_INTRO;

  return (
    <div className="mb-10 overflow-hidden rounded-sm border border-deep-ink/10 bg-ivory/60">
      <div className="grid gap-8 p-6 md:grid-cols-2 md:items-center md:p-8">
        <div>
          <DisplayHeading as="h2" size="section" className="text-neutral-950">
            {intro.title}
          </DisplayHeading>
          <p className="mt-4 text-sm leading-relaxed text-neutral-800 md:text-base">
            {intro.lead}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700 md:text-base">
            {intro.secondary}
          </p>
          <p className="mt-4 text-sm font-semibold text-neutral-950 md:text-base">
            {intro.pricingNote}
          </p>
          <Link
            href="/business-subcriptions"
            className="mt-4 inline-block text-sm font-semibold text-deep-berry underline underline-offset-4 hover:text-plum"
          >
            View subscription plans →
          </Link>
        </div>
        <div className="relative aspect-[1024/381] w-full overflow-hidden rounded-sm border border-deep-ink/10 bg-pure-white">
          <Image
            src={intro.heroImage}
            alt={intro.heroImageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 480px"
            quality={90}
          />
        </div>
      </div>
    </div>
  );
}
