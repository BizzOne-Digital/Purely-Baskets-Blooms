"use client";

import dynamic from "next/dynamic";
import { ToastProvider } from "@/components/ui/Toast";
import { CartDrawerProvider } from "@/components/layout/cart-drawer-context";
import { SearchModalProvider } from "@/components/layout/search-modal-context";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchModal } from "@/components/layout/SearchModal";

const CustomCursor = dynamic(
  () =>
    import("@/components/animations/CustomCursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);

export function StorefrontProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartDrawerProvider>
      <SearchModalProvider>
        <CustomCursor />
        {children}
        <CartDrawer />
        <SearchModal />
        <ToastProvider />
      </SearchModalProvider>
    </CartDrawerProvider>
  );
}
