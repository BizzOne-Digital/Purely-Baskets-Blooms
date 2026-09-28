import { getPublicSiteSettings } from "@/lib/storefront";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";
import { GradientCard } from "@/components/ui/GradientCard";

export const metadata = {
  title: "Privacy Policy | Purely Baskets & Blooms",
};

export default async function PrivacyPage() {
  const settings = await getPublicSiteSettings();
  const content = settings.privacyPolicy;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        eyebrowVariant="berry"
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
        gradient="subtle"
      />

      <PageSection tone="plain" containerClassName="py-12 md:py-16">
        <RevealOnScroll>
          <GradientCard accent="berry" hover={false} className="mx-auto max-w-3xl">
            {content ? (
              <div
                className="prose prose-sm max-w-none text-deep-ink/70 prose-headings:font-serif prose-headings:text-deep-berry"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="space-y-4 text-sm leading-relaxed text-deep-ink/70">
                <p>
                  At Purely Baskets & Blooms, we respect your privacy and are committed to protecting
                  your personal information. This policy outlines how we collect, use, and safeguard
                  your data.
                </p>
                <p>
                  We collect information you provide when placing orders, booking consultations,
                  subscribing to our newsletter, or contacting us. This may include your name, email
                  address, phone number, and delivery details.
                </p>
                <p>
                  We use this information solely to process orders, communicate with you, and improve
                  our services. We do not sell or share your personal information with third parties
                  except as necessary to fulfil your order (e.g. payment processing, delivery).
                </p>
                <p>
                  For questions about this policy, please contact us at info@purelybasketsandblooms.com.
                </p>
              </div>
            )}
          </GradientCard>
        </RevealOnScroll>
      </PageSection>
    </>
  );
}
