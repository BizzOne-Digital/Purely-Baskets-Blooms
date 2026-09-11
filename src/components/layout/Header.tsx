"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useCartDrawer } from "@/components/layout/cart-drawer-context";
import { useSearchModal } from "@/components/layout/search-modal-context";
import { cn } from "@/lib/utils";
import { STOREFRONT_NAV } from "@/lib/constants";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { LogoReveal } from "@/components/animations/LogoReveal";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Header({ logoSrc }: { logoSrc?: string | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const isHydrated = useCartStore((s) => s.isHydrated);
  const { openCart } = useCartDrawer();
  const { openSearch } = useSearchModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-clip transition-all duration-500",
          scrolled
            ? "glass-panel border-b py-3 shadow-sm shadow-black/30"
            : "bg-carbon/40 py-5 backdrop-blur-sm md:py-6"
        )}
      >
        <div className="mx-auto grid w-full min-w-0 max-w-7xl grid-cols-[minmax(0,auto)_1fr_auto] items-center gap-2 px-4 sm:gap-3 md:gap-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <Link href="/" className="relative z-10 min-w-0 max-w-[42vw] shrink justify-self-start sm:max-w-[200px] md:max-w-none">
            <LogoReveal size="md" src={logoSrc} priority className="max-w-full" />
          </Link>

          <nav
            className="hidden items-center justify-center gap-6 xl:gap-8 lg:flex"
            aria-label="Main"
          >
            {STOREFRONT_NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={"title" in item ? item.title : undefined}
                  className={cn(
                    "relative pb-1 text-sm text-cream/75 transition-colors hover:text-gold-light",
                    active && "font-medium text-gold-light"
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-full rounded-full bg-gold" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-1.5 md:gap-2">
            <button
              type="button"
              onClick={openSearch}
              className="flex h-10 w-10 items-center justify-center rounded-full text-cream/70 transition-colors hover:bg-carbon-elevated hover:text-gold-light"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-cream/70 transition-colors hover:bg-carbon-elevated hover:text-gold-light"
              aria-label={`Cart, ${isHydrated ? itemCount : 0} items`}
            >
              <ShoppingBag className="h-4 w-4" />
              {isHydrated && itemCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-carbon">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              ) : null}
            </button>

            <Link href="/booking" className="hidden md:block">
              <Button
                size="sm"
                variant="primary"
                className="whitespace-nowrap px-4 normal-case tracking-normal lg:px-5"
              >
                Create Something Special
              </Button>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-cream lg:hidden"
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu overlay"
        />
      ) : null}
    </>
  );
}

export function HeaderSpacer() {
  return <div className="h-28 shrink-0 md:h-32" aria-hidden />;
}
