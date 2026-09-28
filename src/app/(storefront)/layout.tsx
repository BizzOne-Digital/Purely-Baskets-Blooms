import { getPublicSiteSettings, getPublicCoupons } from "@/lib/storefront";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header, HeaderSpacer } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StorefrontProviders } from "@/components/layout/StorefrontProviders";

export const dynamic = "force-dynamic";

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, coupons] = await Promise.all([
    getPublicSiteSettings(),
    getPublicCoupons(),
  ]);

  return (
    <StorefrontProviders>
      <div className="storefront-shell flex min-w-0 flex-1 flex-col">
        <AnnouncementBar settings={settings} coupons={coupons} />
        <Header logoSrc={settings.logo?.url} />
        <HeaderSpacer />
        <main className="storefront-main min-w-0 flex-1 scroll-mt-28 md:scroll-mt-32">
          {children}
        </main>
        <Footer settings={settings} />
      </div>
    </StorefrontProviders>
  );
}
