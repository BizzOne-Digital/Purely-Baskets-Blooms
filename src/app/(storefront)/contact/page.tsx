import { getPublicSiteSettings } from "@/lib/storefront";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata = {
  title: "Contact | Purely Baskets & Blooms",
  description: "Get in touch with Purely Baskets & Blooms for custom florals, gifting, and events.",
};

export default async function ContactPage() {
  const settings = await getPublicSiteSettings();

  return (
    <ContactPageContent
      email={settings.contactEmail}
      instagramUrl={settings.instagramUrl ?? "https://instagram.com/purelybasketsandblooms"}
      deliveryArea={settings.deliveryAreaText}
      phoneVisible={settings.phoneVisible}
      phoneNumber={settings.phoneNumber}
    />
  );
}
