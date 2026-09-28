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

  const leftNav = STOREFRONT_NAV.slice(0, 3);
  const rightNav = STOREFRONT_NAV.slice(3);

  const navLinkClass = (href: string) =>
    cn(
      "whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.16em] text-deep-ink/75 transition-colors hover:text-deep-berry lg:text-[11px] lg:tracking-[0.2em]",
      isActive(href) && "text-deep-berry"
    );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-hidden border-b border-deep-ink/8 bg-pure-white transition-shadow",
          scrolled && "shadow-sm shadow-black/5"
        )}
      >
        <div className="relative mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-3 md:h-24 md:px-6 lg:px-8">
          {/* Left: mobile wordmark + desktop nav */}
          <div className="flex min-w-0 flex-1 items-center md:justify-end md:pr-[clamp(6rem,17vw,12rem)] lg:pr-[clamp(7rem,19vw,13rem)]">
            <Link href="/" className="block min-w-0 max-w-[calc(100vw-6.25rem)] md:hidden">
              <BrandWordmark
                variant="header"
                className="text-[clamp(0.9rem,3.8vw,1.2rem)] leading-none"
              />
            </Link>
            <nav
              className="hidden items-center gap-3 md:flex lg:gap-5 xl:gap-7"
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
          </div>

          {/* Center wordmark (desktop) — absolute so side nav never overlaps */}
          <Link
            href="/"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden max-w-[min(92vw,22rem)] -translate-x-1/2 -translate-y-1/2 md:pointer-events-auto md:block lg:max-w-none"
          >
            <BrandWordmark
              variant="header"
              className="whitespace-nowrap text-[1.55rem] leading-none lg:text-[2rem] xl:text-[2.35rem]"
            />
          </Link>

          {/* Right: nav + utilities */}
          <div className="flex min-w-0 flex-1 items-center justify-end gap-0.5 sm:gap-1 md:justify-start md:pl-[clamp(6rem,17vw,12rem)] lg:pl-[clamp(7rem,19vw,13rem)]">
            <nav
              className="mr-1 hidden min-w-0 items-center gap-4 md:flex lg:gap-6 xl:gap-8"
              aria-label="Primary right"
            >
              {rightNav.map((item) => (
                <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={openSearch}
              className="hidden h-10 w-10 shrink-0 items-center justify-center text-deep-ink/70 transition-colors hover:text-deep-berry md:flex"
              aria-label="Search"
            >
              <Search className="h-[1.125rem] w-[1.125rem] stroke-[1.5]" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center text-deep-ink/70 transition-colors hover:text-deep-berry"
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
              className="flex h-10 w-10 shrink-0 items-center justify-center text-deep-ink md:hidden"
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
