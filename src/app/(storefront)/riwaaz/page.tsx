import { getRiwaazProducts } from "@/lib/storefront";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { PageSection } from "@/components/layout/PageSection";
import { RiwaazPageHero } from "@/components/riwaaz/RiwaazPageHero";

export const metadata = {
  title: "The Riwaaz Collection | Purely Baskets & Blooms",
  description:
    "Celebrate heritage with our Riwaaz collection — floral arrangements for Roka, Mehndi, Shagun, and South Asian weddings.",
};

export default async function RiwaazPage() {
  const products = await getRiwaazProducts(24);

  return (
    <>
      <RiwaazPageHero />

      {products.length > 0 ? (
        <PageSection tone="plain">
          <ProductGrid products={products} />
        </PageSection>
      ) : null}
    </>
  );
}
