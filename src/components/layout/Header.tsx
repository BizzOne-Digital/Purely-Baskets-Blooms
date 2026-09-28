"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useCartDrawer } from "@/components/layout/cart-drawer-context";
import { cn } from "@/lib/utils";
import { STOREFRONT_NAV } from "@/lib/constants";
import { ShoppingBag, Menu } from "lucide-react";
import { BrandWordmark } from "@/components/brand/BrandWordmark";
import { MobileMenu } from "./MobileMenu";

export function Header({ logoSrc }: { logoSrc?: string | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const isHydrated = useCartStore((s) => s.isHydrated);
  const { openCart } = useCartDrawer();

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
      "text-[11px] font-semibold uppercase tracking-[0.18em] text-deep-ink/70 transition-colors hover:text-deep-berry",
      isActive(href) && "text-deep-berry underline decoration-deep-berry/40 underline-offset-4"
    );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-clip border-b border-deep-ink/10 bg-pure-white/95 backdrop-blur-md transition-shadow",
          scrolled && "shadow-sm shadow-black/5"
        )}
      >
        <div className="mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-4 md:px-8 md:py-4">
          <nav className="hidden min-w-0 items-center gap-5 md:flex md:justify-start lg:gap-8" aria-label="Primary left">
            {leftNav.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="relative z-10 mx-auto min-w-0 shrink px-1 md:justify-self-center"
          >
            <BrandWordmark src={logoSrc} priority variant="header" />
          </Link>

          <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2 md:gap-3">
            <nav className="hidden items-center gap-5 md:flex lg:gap-8" aria-label="Primary right">
              {rightNav.map((item) => (
                <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-deep-ink/75 transition-colors hover:bg-blush/60 hover:text-deep-berry"
              aria-label={`Cart, ${isHydrated ? itemCount : 0} items`}
            >
              <ShoppingBag className="h-4 w-4" />
              {isHydrated && itemCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-deep-berry text-[9px] font-medium text-pure-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-deep-ink md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} logoSrc={logoSrc} />

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
  return <div className="h-[5.5rem] shrink-0 sm:h-24 md:h-28" aria-hidden />;
}
