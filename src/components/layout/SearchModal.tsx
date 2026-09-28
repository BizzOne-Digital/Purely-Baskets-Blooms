"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useSearchModal } from "./search-modal-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { formatPriceDisplay } from "@/lib/utils";
import type { SerializedProduct } from "@/lib/storefront";

export function SearchModal() {
  const { isOpen, closeSearch } = useSearchModal();
  const reducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SerializedProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.products ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  const handleClose = useCallback(() => {
    setQuery("");
    setResults([]);
    closeSearch();
  }, [closeSearch]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-[90] bg-plum/40 backdrop-blur-md"
            onClick={handleClose}
          />
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-[100] mx-auto max-w-2xl rounded-2xl glass-panel border border-champagne/30 p-6 shadow-2xl md:inset-x-auto"
            role="dialog"
            aria-label="Search products"
          >
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-deep-berry/50" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search arrangements, baskets, occasions..."
                className="flex-1 bg-transparent text-deep-ink placeholder:text-deep-ink/40 focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-blush/40"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 max-h-[50vh] overflow-y-auto" data-lenis-prevent>
              {loading ? (
                <p className="py-8 text-center text-sm text-deep-ink/50">Searching...</p>
              ) : results.length > 0 ? (
                <ul className="divide-y divide-champagne/20">
                  {results.map((product) => (
                    <li key={product._id}>
                      <Link
                        href={`/shop/${product.slug}`}
                        onClick={handleClose}
                        className="flex items-center gap-4 py-3 transition-colors hover:bg-blush/20"
                      >
                        <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-md bg-blush/30">
                          <Image
                            src={product.mainImage.url}
                            alt={product.mainImage.alt ?? product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-deep-ink">{product.name}</p>
                          <p className="text-sm text-deep-berry">
                            {formatPriceDisplay(
                              product.priceType,
                              product.basePrice,
                              product.salePrice
                            )}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-deep-ink/30" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : query.trim() ? (
                <p className="py-8 text-center text-sm text-deep-ink/50">
                  No products found for &ldquo;{query}&rdquo;
                </p>
              ) : (
                <p className="py-8 text-center text-sm text-deep-ink/50">
                  Start typing to search our collection
                </p>
              )}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
