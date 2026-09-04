import {
  getPublicSiteSettings,
  getFeaturedProducts,
  getFeaturedTestimonials,
} from "@/lib/storefront";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeCategoryStrip } from "@/components/home/HomeCategoryStrip";
import { HomeOccasionsSection } from "@/components/home/HomeOccasionsSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HomeStorySplit } from "@/components/home/HomeStorySplit";
import { HomeServicesMosaic } from "@/components/home/HomeServicesMosaic";
import { HomePromoBanners } from "@/components/home/HomePromoBanners";
import { HomeProcessSection } from "@/components/home/HomeProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { HomeInstagramGrid } from "@/components/home/HomeInstagramGrid";

export default async function HomePage() {
  const [settings, products, testimonials] = await Promise.all([
    getPublicSiteSettings(),
    getFeaturedProducts(8),
    getFeaturedTestimonials(),
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <HomeCategoryStrip />
      <HomeOccasionsSection />
      <FeaturedProducts products={products} />
      <HomeStorySplit />
      <HomeServicesMosaic />
      <HomePromoBanners />
      <HomeProcessSection />
      <TestimonialsSection testimonials={testimonials} />
      <HomeInstagramGrid />
    </>
  );
}
