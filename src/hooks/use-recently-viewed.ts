"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "pbb-recently-viewed";
const MAX_ITEMS = 8;

export interface RecentlyViewedProduct {
  _id: string;
  slug: string;
  name: string;
  imageUrl: string;
  priceType: string;
  basePrice?: number;
}

function readStoredItems(): RecentlyViewedProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<RecentlyViewedProduct[]>(readStoredItems);

  const addProduct = useCallback((product: RecentlyViewedProduct) => {
    setItems((prev) => {
      const filtered = prev.filter((p) => p._id !== product._id);
      const next = [product, ...filtered].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore storage errors */
      }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return { items, addProduct, clearAll };
}
