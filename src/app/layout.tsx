import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from "next/font/google";
import { BRAND } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";
import { AppProviders } from "@/components/layout/AppProviders";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${BRAND.name} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Luxury floral arrangements, gift baskets, corporate gifting, and event florals in the GTA. Thoughtfully designed. Beautifully celebrated.",
  keywords: [
    "florist",
    "gift baskets",
    "GTA florist",
    "wedding florals",
    "corporate gifting",
    "Riwaaz collection",
    "South Asian weddings",
  ],
  openGraph: {
    title: BRAND.name,
    description: BRAND.tagline,
    type: "website",
    locale: "en_CA",
    images: [{ url: BRAND.logoPath, alt: BRAND.name }],
  },
  icons: {
    icon: BRAND.logoPath,
    apple: BRAND.logoPath,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-deep-ink">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
