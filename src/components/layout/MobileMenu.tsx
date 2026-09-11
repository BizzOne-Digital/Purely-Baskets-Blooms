"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { STOREFRONT_NAV } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  logoSrc?: string | null;
}

export function MobileMenu({ open, onClose, logoSrc }: MobileMenuProps) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={reducedMotion ? false : { x: "100%" }}
          animate={{ x: 0 }}
          exit={reducedMotion ? undefined : { x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-y-0 right-0 z-50 w-full max-w-sm glass-panel border-l border-gold/20 p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <BrandLogo src={logoSrc} size="sm" />
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full text-cream hover:bg-carbon-elevated"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile">
            {STOREFRONT_NAV.map((item, i) => (
              <motion.div
                key={item.href}
                initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block border-b border-gold/15 py-4 text-sm text-cream/80 transition-colors hover:text-gold-light"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-8 space-y-3">
            <Link href="/booking" onClick={onClose}>
              <Button className="w-full normal-case tracking-normal">
                Create Something Special
              </Button>
            </Link>
            <Link href="/cart" onClick={onClose}>
              <Button variant="outline" className="w-full">
                View Cart
              </Button>
            </Link>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
