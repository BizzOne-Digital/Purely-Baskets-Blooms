import { getPublicSiteSettings } from "@/lib/storefront";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeLeadTimeNotice } from "@/components/home/HomeLeadTimeNotice";
import { HomeMomentsSection } from "@/components/home/HomeMomentsSection";
import { HomeThanksgivingBanner } from "@/components/home/HomeThanksgivingBanner";
import { HomeVisionCta } from "@/components/home/HomeVisionCta";

export default async function HomePage() {
  const settings = await getPublicSiteSettings();

  return (
    <>
      <HomeThanksgivingBanner />
      <HeroSection settings={settings} />
      <HomeLeadTimeNotice />
      <HomeMomentsSection />
      <HomeVisionCta />
    </>
  );
}
