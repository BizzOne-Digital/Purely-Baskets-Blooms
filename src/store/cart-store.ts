"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/types";
import { getEffectiveUnitPrice } from "@/lib/utils";

interface CartState {
  items: CartItem[];
  couponCode?: string;
  isHydrated: boolean;
  setHydrated: (value: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  updateItem: (cartKey: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  setCoupon: (code: string | undefined) => void;
  getItemCount: () => number;
  getCartKey: (item: CartItem) => string;
  getSubtotal: () => number;
}

function buildCartKey(item: CartItem): string {
  const parts = [
    item.productId,
    item.selectedSize ?? "",
    item.selectedColor ?? "",
    ...item.selectedOptions.map((o) => `${o.name}:${o.value}`),
    ...item.selectedAddOns.map((a) => `${a.name}:${a.quantity}`),
  ];
  return parts.join("|");
}

function computeLineTotal(item: CartItem): number {
  const base = (item.unitPrice + (item.sizePriceModifier ?? 0)) * item.quantity;
  const addons = item.selectedAddOns.reduce(
    (sum, addon) => sum + addon.price * addon.quantity,
    0
  );
  return base + addons;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: undefined,
      isHydrated: false,
      setHydrated: (value) => set({ isHydrated: value }),

      getCartKey: (item) => buildCartKey(item),

      addItem: (item) => {
        const key = buildCartKey(item);
        set((state) => {
          const existing = state.items.find((i) => buildCartKey(i) === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                buildCartKey(i) === key
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (cartKey) => {
        set((state) => ({
          items: state.items.filter((i) => buildCartKey(i) !== cartKey),
        }));
      },

      updateQuantity: (cartKey, quantity) => {
        if (quantity < 1) {
          get().removeItem(cartKey);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            buildCartKey(i) === cartKey ? { ...i, quantity } : i
          ),
        }));
      },

      updateItem: (cartKey, updates) => {
        set((state) => ({
          items: state.items.map((i) =>
            buildCartKey(i) === cartKey ? { ...i, ...updates } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: undefined }),

      setCoupon: (code) => set({ couponCode: code }),

      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      getSubtotal: () => get().items.reduce((sum, item) => sum + computeLineTotal(item), 0),
    }),
    {
      name: "pbb-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

export function createCartItemFromProduct(
  product: {
    _id: string;
    slug: string;
    name: string;
    mainImage: { url: string; alt?: string };
    priceType: CartItem["priceType"];
    basePrice?: number;
    salePrice?: number;
    saleStartDate?: string | Date | null;
    saleEndDate?: string | Date | null;
    leadTime?: string;
  },
  options: {
    quantity?: number;
    selectedSize?: string;
    sizePriceModifier?: number;
    selectedColor?: string;
    selectedOptions?: CartItem["selectedOptions"];
    selectedAddOns?: CartItem["selectedAddOns"];
    giftMessage?: string;
    recipientName?: string;
    preferredDeliveryDate?: string;
  } = {}
): CartItem | null {
  const unitPrice = getEffectiveUnitPrice(
    product.basePrice,
    product.salePrice,
    product.saleStartDate,
    product.saleEndDate
  );

  if (product.priceType !== "quote" && (unitPrice === null || unitPrice === undefined)) {
    return null;
  }

  return {
    productId: product._id,
    slug: product.slug,
    name: product.name,
    imageUrl: product.mainImage.url,
    priceType: product.priceType,
    unitPrice: unitPrice ?? 0,
    quantity: options.quantity ?? 1,
    selectedSize: options.selectedSize,
    sizePriceModifier: options.sizePriceModifier,
    selectedColor: options.selectedColor,
    selectedOptions: options.selectedOptions ?? [],
    selectedAddOns: options.selectedAddOns ?? [],
    giftMessage: options.giftMessage,
    recipientName: options.recipientName,
    preferredDeliveryDate: options.preferredDeliveryDate,
    leadTime: product.leadTime,
  };
}

export { buildCartKey as getCartItemKey };
