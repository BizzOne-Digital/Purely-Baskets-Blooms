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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
    icon: [
      { url: BRAND.faviconPath, type: "image/png" },
      { url: BRAND.faviconPath, type: "image/png", sizes: "32x32" },
      { url: BRAND.faviconPath, type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: BRAND.faviconPath, type: "image/png" }],
    shortcut: BRAND.faviconPath,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable} h-full w-full overflow-x-clip antialiased`}
    >
      <body className="flex min-h-full w-full max-w-full flex-col overflow-x-clip bg-pure-white font-sans text-deep-ink">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
