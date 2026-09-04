import { getRiwaazProducts } from "@/lib/storefront";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
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
        <PageSection tone="blush">
          <RevealOnScroll className="mb-10 text-center">
            <span className="font-display text-5xl text-deep-berry/20 md:text-7xl">रिवाज़</span>
            <p className="mx-auto mt-4 max-w-2xl text-deep-ink/70">
              Each arrangement in The Riwaaz Collection is thoughtfully designed with cultural
              symbolism, vibrant palettes, and artisan craftsmanship.
            </p>
          </RevealOnScroll>
          <ProductGrid products={products} />
        </PageSection>
      ) : null}
    </>
  );
}
