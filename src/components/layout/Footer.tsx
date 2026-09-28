import Link from "next/link";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { BRAND } from "@/lib/constants";
import type { SerializedSiteSettings } from "@/lib/storefront";
import { BrandWordmark } from "@/components/brand/BrandWordmark";

interface FooterProps {
  settings: SerializedSiteSettings;
}

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Customize", href: "/customize" },
  { label: "Subscriptions", href: "/business-subcriptions" },
  { label: "Custom Florals", href: "/booking" },
  { label: "Contact", href: "/contact" },
] as const;

export function Footer({ settings }: FooterProps) {
  const copyright =
    settings.footerContent?.copyrightText ??
    `© ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.`;
  const instagram = settings.instagramUrl ?? BRAND.instagramUrl;

  return (
    <footer className="mt-auto w-full max-w-full overflow-x-hidden border-t border-deep-ink/10 bg-pure-white">
      <div className="mx-auto flex min-w-0 max-w-7xl flex-col gap-8 px-4 py-10 md:flex-row md:items-start md:justify-between md:px-8 md:py-12">
        <Link href="/" className="inline-block min-w-0 max-w-full">
          <BrandWordmark variant="footer" className="max-w-full text-2xl sm:text-3xl md:text-4xl" />
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium uppercase tracking-[0.12em] text-deep-ink/70">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-deep-berry">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-deep-ink/70 hover:text-deep-berry"
          aria-label="Instagram"
        >
          <InstagramIcon className="h-4 w-4" />
          Instagram
        </a>
      </div>

      <p className="border-t border-deep-ink/8 py-4 text-center text-xs text-deep-ink/50">
        {copyright}
      </p>
    </footer>
  );
}
