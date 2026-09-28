import { getPublicSiteSettings, getFeaturedProducts } from "@/lib/storefront";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeMomentsSection } from "@/components/home/HomeMomentsSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HomeVisionCta } from "@/components/home/HomeVisionCta";

export default async function HomePage() {
  const [settings, products] = await Promise.all([
    getPublicSiteSettings(),
    getFeaturedProducts(6),
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <HomeMomentsSection />
      <FeaturedProducts products={products} />
      <HomeVisionCta />
    </>
  );
}
