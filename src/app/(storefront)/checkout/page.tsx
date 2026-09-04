import { getPublicSiteSettings } from "@/lib/storefront";
import { CheckoutPageContent } from "@/components/checkout/CheckoutPageContent";

export const metadata = {
  title: "Checkout | Purely Baskets & Blooms",
};

export default async function CheckoutPage() {
  const settings = await getPublicSiteSettings();

  return (
    <CheckoutPageContent
      stripeEnabled={settings.stripeEnabled}
      deliveryCharge={settings.deliveryCharge}
      taxRate={settings.taxRate}
    />
  );
}
