import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BRAND, CURRENCY } from "@/lib/constants";
import type { PriceType } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  amount: number | null | undefined,
  options?: { showSymbol?: boolean; fallback?: string }
): string {
  const { showSymbol = true, fallback = "Contact for pricing" } = options ?? {};

  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return fallback;
  }

  const formatted = new Intl.NumberFormat(CURRENCY.locale, {
    style: showSymbol ? "currency" : "decimal",
    currency: CURRENCY.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return formatted;
}

export function formatPriceDisplay(
  priceType: PriceType,
  basePrice?: number | null,
  salePrice?: number | null
): string {
  if (priceType === "quote") {
    return "Contact for pricing";
  }

  const effectivePrice = salePrice ?? basePrice;

  if (effectivePrice === null || effectivePrice === undefined) {
    return priceType === "starting"
      ? "Starting price coming soon"
      : "Contact for pricing";
  }

  const formatted = formatPrice(effectivePrice);

  if (priceType === "starting") {
    return `From ${formatted}`;
  }

  return formatted;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateOrderNumber(
  sequence: number,
  year?: number
): string {
  const orderYear = year ?? new Date().getFullYear();
  const paddedSequence = String(sequence).padStart(5, "0");
  return `${BRAND.orderNumberPrefix}-${orderYear}-${paddedSequence}`;
}

export function parseOrderNumberSequence(orderNumber: string): number | null {
  const match = orderNumber.match(/^PBB-\d{4}-(\d{5})$/);
  if (!match) return null;
  return parseInt(match[1], 10);
}

export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeWords(text: string): string {
  return text
    .split(/[\s_-]+/)
    .map((word) => capitalize(word))
    .join(" ");
}

export function formatStatusLabel(status: string): string {
  return status
    .split("_")
    .map((part) => capitalize(part))
    .join(" ");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidCanadianPostalCode(postalCode: string): boolean {
  const normalized = postalCode.replace(/\s/g, "").toUpperCase();
  return /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(normalized);
}

export function formatCanadianPostalCode(postalCode: string): string {
  const normalized = postalCode.replace(/\s/g, "").toUpperCase();
  if (normalized.length !== 6) return postalCode.toUpperCase();
  return `${normalized.slice(0, 3)} ${normalized.slice(3)}`;
}

export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base.replace(/\/$/, "")}${normalizedPath}`;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred";
}

export function omitUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as Partial<T>;
}

export function roundCurrency(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isSaleActive(
  salePrice?: number | null,
  saleStartDate?: Date | string | null,
  saleEndDate?: Date | string | null,
  now: Date = new Date()
): boolean {
  if (!salePrice || salePrice <= 0) return false;

  const start = saleStartDate ? new Date(saleStartDate) : null;
  const end = saleEndDate ? new Date(saleEndDate) : null;

  if (start && now < start) return false;
  if (end && now > end) return false;

  return true;
}

export function getEffectiveUnitPrice(
  basePrice?: number | null,
  salePrice?: number | null,
  saleStartDate?: Date | string | null,
  saleEndDate?: Date | string | null
): number | null {
  if (isSaleActive(salePrice, saleStartDate, saleEndDate) && salePrice) {
    return salePrice;
  }
  return basePrice ?? null;
}
