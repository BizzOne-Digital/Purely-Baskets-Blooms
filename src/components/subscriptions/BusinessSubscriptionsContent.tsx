import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Button } from "@/components/ui/Button";
import { PageSection } from "@/components/layout/PageSection";
import {
  BUSINESS_SUBSCRIPTIONS_INTRO,
  SUBSCRIPTION_BENEFITS,
  SUBSCRIPTION_PLANS,
  SUBSCRIPTION_SERVICES,
} from "@/lib/business-subscriptions-content";

export function BusinessSubscriptionsContent() {
  const intro = BUSINESS_SUBSCRIPTIONS_INTRO;

  return (
    <>
      <section className="w-full max-w-full overflow-x-hidden border-b border-deep-ink/10 bg-ivory">
        <div className="mx-auto grid min-w-0 w-full max-w-5xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:px-8 md:py-16">
          <div className="text-center md:text-left">
            <DisplayHeading as="h1" size="page" className="text-neutral-950">
              {intro.title}
            </DisplayHeading>
            <p className="mt-6 text-base leading-relaxed text-neutral-800 md:text-lg">
              {intro.lead}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700 md:text-base">
              {intro.secondary}
            </p>
            <p className="mt-6 font-display text-lg font-semibold text-neutral-950 md:text-xl">
              {intro.pricingNote}
            </p>
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-sm border border-deep-ink/10 bg-pure-white shadow-sm">
            <Image
              src={intro.heroImage}
              alt={intro.heroImageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>
        </div>
      </section>

      <PageSection tone="plain" containerClassName="py-14 md:py-18">
        <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <li
              key={plan.id}
              className={
                plan.highlight
                  ? "flex flex-col overflow-hidden rounded-sm border-2 border-deep-berry/30 bg-ivory/50 shadow-sm"
                  : "flex flex-col overflow-hidden rounded-sm border border-deep-ink/10 bg-pure-white"
              }
            >
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl font-semibold text-neutral-950">
                  {plan.title}
                </h2>
                <p className="mt-2 text-sm text-deep-ink/70">{plan.frequency}</p>
                {"showBenefits" in plan && plan.showBenefits ? (
                  <div className="mt-6 border-t border-deep-ink/10 pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-deep-berry">
                      Benefits
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {SUBSCRIPTION_BENEFITS.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex gap-2 text-sm leading-snug text-deep-ink/75"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-deep-berry" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection tone="subtle" containerClassName="py-14 md:py-18">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {SUBSCRIPTION_SERVICES.map((service) => (
            <article
              key={service.id}
              className="overflow-hidden rounded-sm border border-deep-ink/10 bg-pure-white"
            >
              <div className="p-6 md:p-8">
                <h2 className="font-display text-xl font-semibold text-neutral-950 md:text-2xl">
                  {service.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm leading-relaxed text-deep-ink/75"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-deep-berry" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <section className="border-t border-deep-ink/10 bg-blush/35 py-14 md:py-16">
        <div className="mx-auto max-w-xl px-4 text-center md:px-8">
          <DisplayHeading as="h2" size="section" className="text-deep-berry">
            Let&apos;s chat
          </DisplayHeading>
          <p className="mt-4 text-sm leading-relaxed text-deep-ink/70">
            Tell us about your office, delivery schedule, and style — we&apos;ll put together a
            subscription plan that fits.
          </p>
          <Link
            href="/booking?service=floral_subscription"
            className="mt-8 inline-block"
          >
            <Button size="lg">Start a conversation →</Button>
          </Link>
          <Link
            href="/contact"
            className="mt-4 block text-sm text-deep-berry underline underline-offset-4 hover:text-plum"
          >
            Or contact us directly
          </Link>
        </div>
      </section>
    </>
  );
}
