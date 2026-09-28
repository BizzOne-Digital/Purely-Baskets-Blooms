import { getPublicSiteSettings } from "@/lib/storefront";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeMomentsSection } from "@/components/home/HomeMomentsSection";
import { HomeVisionCta } from "@/components/home/HomeVisionCta";

export default async function HomePage() {
  const settings = await getPublicSiteSettings();

  return (
    <>
      <HeroSection settings={settings} />
      <HomeMomentsSection />
      <HomeVisionCta />
    </>
  );
}
