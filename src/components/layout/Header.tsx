"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useCartDrawer } from "@/components/layout/cart-drawer-context";
import { useSearchModal } from "@/components/layout/search-modal-context";
import { cn } from "@/lib/utils";
import { STOREFRONT_NAV } from "@/lib/constants";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { BrandWordmark } from "@/components/brand/BrandWordmark";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const isHydrated = useCartStore((s) => s.isHydrated);
  const { openCart } = useCartDrawer();
  const { openSearch } = useSearchModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const leftNav = STOREFRONT_NAV.slice(0, 2);
  const rightNav = STOREFRONT_NAV.slice(2);

  const navLinkClass = (href: string) =>
    cn(
      "text-[11px] font-medium uppercase tracking-[0.22em] text-deep-ink/75 transition-colors hover:text-deep-berry",
      isActive(href) && "text-deep-berry"
    );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-clip border-b border-deep-ink/8 bg-pure-white transition-shadow",
          scrolled && "shadow-sm shadow-black/5"
        )}
      >
        <div className="mx-auto grid w-full min-w-0 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-3.5 md:grid-cols-[1fr_auto_1fr] md:gap-6 md:px-8 md:py-5">
          <nav
            className="hidden min-w-0 items-center gap-6 md:flex lg:gap-10"
            aria-label="Primary left"
          >
            {leftNav.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
                {item.href === "/" && isActive("/") ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-deep-ink/40" aria-hidden>
                      −
                    </span>
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-0 justify-center px-0.5 md:justify-self-center">
            <Link href="/" className="min-w-0 text-center">
              <BrandWordmark
                variant="header"
                className="text-[1.35rem] sm:text-4xl md:text-[2.35rem] lg:text-[2.65rem]"
              />
            </Link>
          </div>

          <div className="flex min-w-0 items-center justify-end gap-0.5 sm:gap-1 md:gap-2">
            <nav className="hidden items-center gap-6 md:flex lg:gap-10" aria-label="Primary right">
              {rightNav.map((item) => (
                <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={openSearch}
              className="hidden h-10 w-10 items-center justify-center text-deep-ink/70 transition-colors hover:text-deep-berry sm:flex"
              aria-label="Search"
            >
              <Search className="h-[1.125rem] w-[1.125rem] stroke-[1.5]" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center text-deep-ink/70 transition-colors hover:text-deep-berry"
              aria-label={`Cart, ${isHydrated ? itemCount : 0} items`}
            >
              <ShoppingBag className="h-[1.125rem] w-[1.125rem] stroke-[1.5]" />
              {isHydrated && itemCount > 0 ? (
                <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-deep-berry text-[8px] font-medium text-pure-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-deep-ink md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu overlay"
        />
      ) : null}
    </>
  );
}

export function HeaderSpacer() {
  return <div className="h-[4.25rem] shrink-0 md:h-24" aria-hidden />;
}
