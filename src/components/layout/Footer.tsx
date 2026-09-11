import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { BRAND } from "@/lib/constants";
import type { SerializedSiteSettings } from "@/lib/storefront";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { LotusMark } from "@/components/editorial/LotusMark";

interface FooterProps {
  settings: SerializedSiteSettings;
}

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const COLLECTION_LINKS = [
  { label: "The Riwaaz Collection", href: "/riwaaz" },
  { label: "Custom Florals", href: "/services" },
  { label: "Corporate Gifting", href: "/services" },
  { label: "Floral Subscriptions", href: "/services" },
];

const CELEBRATE_LINKS = [
  { label: "Event Florals", href: "/event-florals" },
  { label: "Weddings", href: "/event-florals" },
  { label: "Custom Order", href: "/shop" },
  { label: "Book a Consultation", href: "/booking" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-gold-light">{title}</h3>
      <div className="mt-2 h-px w-10 bg-gradient-to-r from-marigold/80 to-transparent" />
      <LotusMark size="sm" className="mt-3 text-marigold/80" />
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-sm text-cream/70 transition-colors hover:text-gold-light"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PaymentBadges() {
  const badges = ["VISA", "MC", "AMEX", "Apple Pay", "G Pay"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
      {badges.map((badge) => (
        <span
          key={badge}
          className="rounded border border-champagne/35 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-champagne/80"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}

export function Footer({ settings }: FooterProps) {
  const about =
    settings.footerContent?.aboutSnippet ??
    "Thoughtfully designed florals and meaningful gifts for personal celebrations, cultural traditions and professional occasions.";
  const copyright =
    settings.footerContent?.copyrightText ??
    `© ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.`;
  const instagram = settings.instagramUrl ?? BRAND.instagramUrl;
  const email = settings.contactEmail ?? BRAND.email;
  const deliveryArea = settings.deliveryAreaText ?? BRAND.deliveryArea;

  return (
    <footer className="mt-auto">
      <FooterNewsletter />

      <div className="relative border-t border-gold/15 bg-carbon">
          <div className="gold-rule mb-8 opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-7xl min-w-0 px-4 pb-10 pt-2 md:px-8 md:pb-12">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
              <div className="space-y-4 md:col-span-2 lg:col-span-2">
                <Link href="/" className="inline-block max-w-full">
                  <Image
                    src={BRAND.footerLogoPath}
                    alt={BRAND.name}
                    width={380}
                    height={100}
                    className="h-[4.25rem] w-auto max-w-[min(100%,20rem)] object-contain object-left sm:h-20 md:h-[5.5rem] md:max-w-[22rem]"
                  />
                </Link>
                <p className="max-w-sm text-sm leading-relaxed text-cream/65">{about}</p>
              </div>

              <FooterColumn title="Explore" links={EXPLORE_LINKS} />
              <FooterColumn title="Collections" links={COLLECTION_LINKS} />
              <FooterColumn title="Celebrate" links={CELEBRATE_LINKS} />

              <div>
                <h3 className="font-display text-lg font-semibold text-champagne">Connect</h3>
                <div className="mt-2 h-px w-10 bg-gradient-to-r from-marigold/80 to-transparent" />
                <LotusMark size="sm" className="mt-3 text-marigold/80" />
                <ul className="mt-4 space-y-3 text-sm text-ivory/75">
                  <li>
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex min-w-0 items-center gap-3 break-all transition-colors hover:text-champagne"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-champagne/40">
                        <Mail className="h-3.5 w-3.5 text-marigold" />
                      </span>
                      {email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 transition-colors hover:text-champagne"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-champagne/40">
                        <InstagramIcon className="h-3.5 w-3.5" />
                      </span>
                      {BRAND.instagram}
                    </a>
                  </li>
                  <li className="inline-flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-champagne/40">
                      <MapPin className="h-3.5 w-3.5 text-marigold" />
                    </span>
                    <span>{deliveryArea}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-gold/15 pt-6">
              <div className="flex flex-col items-center gap-5 text-xs text-cream/50 md:flex-row md:justify-between">
                <p className="text-center md:text-left">{copyright}</p>
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                  <Link href="/privacy" className="transition-colors hover:text-champagne">
                    Privacy Policy
                  </Link>
                  <span className="text-ivory/25">|</span>
                  <Link href="/terms" className="transition-colors hover:text-champagne">
                    Terms &amp; Conditions
                  </Link>
                  <span className="text-ivory/25">|</span>
                  <Link href="/contact" className="transition-colors hover:text-champagne">
                    Shipping &amp; Delivery
                  </Link>
                </div>
                <PaymentBadges />
              </div>
            </div>
          </div>
      </div>
    </footer>
  );
}
