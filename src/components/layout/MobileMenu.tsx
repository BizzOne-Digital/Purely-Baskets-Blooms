"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { STOREFRONT_NAV } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { BrandWordmark } from "@/components/brand/BrandWordmark";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-deep-ink/10 bg-pure-white p-6 shadow-xl">
      <div className="flex shrink-0 items-center justify-between">
        <BrandWordmark variant="compact" />
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-deep-ink hover:bg-blush/50"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav
        className="mt-8 min-h-0 flex-1 overflow-y-auto overscroll-contain"
        aria-label="Mobile"
      >
        <div className="flex flex-col gap-0">
          {STOREFRONT_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "block border-b border-deep-ink/8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-deep-ink/75 hover:text-deep-berry",
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-deep-berry"
                  : ""
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/riwaaz"
            onClick={onClose}
            className="block border-b border-deep-ink/8 py-4 text-sm text-deep-ink/75 hover:text-deep-berry"
          >
            Riwaaz Collection
          </Link>
        </div>
      </nav>

      <div className="mt-6 flex shrink-0 flex-col gap-3 border-t border-deep-ink/10 pt-6">
        <Link href="/booking" onClick={onClose} className="block w-full">
          <Button size="lg" className="w-full normal-case tracking-normal">
            Custom Florals
          </Button>
        </Link>
        <Link href="/cart" onClick={onClose} className="block w-full">
          <Button size="lg" variant="outline" className="w-full normal-case tracking-normal">
            View Cart
          </Button>
        </Link>
      </div>
    </aside>
  );
}
