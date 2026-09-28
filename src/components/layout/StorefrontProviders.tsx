"use client";

import { ToastProvider } from "@/components/ui/Toast";
import { CartDrawerProvider } from "@/components/layout/cart-drawer-context";
import { SearchModalProvider } from "@/components/layout/search-modal-context";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchModal } from "@/components/layout/SearchModal";

export function StorefrontProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartDrawerProvider>
      <SearchModalProvider>
        {children}
        <CartDrawer />
        <SearchModal />
        <ToastProvider />
      </SearchModalProvider>
    </CartDrawerProvider>
  );
}
