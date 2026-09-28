import { getPublicSiteSettings } from "@/lib/storefront";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";
import { GradientCard } from "@/components/ui/GradientCard";

export const metadata = {
  title: "Terms & Conditions | Purely Baskets & Blooms",
};

export default async function TermsPage() {
  const settings = await getPublicSiteSettings();
  const content = settings.termsAndConditions;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        eyebrowVariant="berry"
        title="Terms & Conditions"
        description="Terms governing your use of our website and services."
        gradient="subtle"
      />

      <PageSection tone="plain" containerClassName="py-12 md:py-16">
        <RevealOnScroll>
          <GradientCard accent="champagne" hover={false} className="mx-auto max-w-3xl">
            {content ? (
              <div
                className="prose prose-sm max-w-none text-deep-ink/70 prose-headings:font-serif prose-headings:text-deep-berry"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="space-y-4 text-sm leading-relaxed text-deep-ink/70">
                <p>
                  By using the Purely Baskets & Blooms website and placing orders, you agree to these
                  terms and conditions.
                </p>
                <p>
                  All floral arrangements and gift baskets are handcrafted. Slight variations in
                  flowers, colours, and materials may occur due to seasonal availability. We will always
                  strive to match the spirit and palette of your selected design.
                </p>
                <p>
                  Orders are subject to availability and lead times as indicated on each product.
                  Cancellations must be requested at least 48 hours before the scheduled delivery or
                  event date.
                </p>
                <p>
                  Delivery is available within our service area. Delivery fees and taxes are calculated
                  at checkout. Risk of loss passes to you upon delivery.
                </p>
                <p>
                  For questions, contact info@purelybasketsandblooms.com.
                </p>
              </div>
            )}
          </GradientCard>
        </RevealOnScroll>
      </PageSection>
    </>
  );
}
