import { z } from "zod";
import { BRAND } from "@/lib/constants";

export const PLACEHOLDER_IMAGE = BRAND.logoPath;

const LEGACY_UPLOAD_PREFIX = "/uploads/";

export function isStoredUploadUrl(url: string): boolean {
  return url.startsWith("/api/uploads/");
}

export function isLegacyDiskUploadUrl(url: string): boolean {
  return url.startsWith(LEGACY_UPLOAD_PREFIX);
}

export function parseStoredUploadUrl(
  url: string
): { folder: string; filename: string } | null {
  if (!isStoredUploadUrl(url)) {
    return null;
  }

  const path = url.slice("/api/uploads/".length);
  const slashIndex = path.indexOf("/");

  if (slashIndex <= 0) {
    return null;
  }

  const folder = path.slice(0, slashIndex);
  const filename = path.slice(slashIndex + 1);

  if (!isSafeUploadPath(folder, filename)) {
    return null;
  }

  return { folder, filename };
}

export function isSafeUploadPath(folder: string, filename: string): boolean {
  if (!folder || !filename) {
    return false;
  }

  if (
    folder.includes("..") ||
    folder.includes("/") ||
    filename.includes("..") ||
    filename.includes("/")
  ) {
    return false;
  }

  return true;
}

export function buildStoredUploadUrl(folder: string, filename: string): string {
  return `/api/uploads/${folder}/${filename}`;
}

/** Resolve image src for display; legacy disk uploads fall back to placeholder. */
export function resolveImageSrc(url: string | undefined | null): string {
  if (!url) {
    return PLACEHOLDER_IMAGE;
  }

  if (isLegacyDiskUploadUrl(url)) {
    return PLACEHOLDER_IMAGE;
  }

  return url;
}

export function isValidImagePath(value: string): boolean {
  if (value.startsWith("/")) {
    return true;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export const imagePathSchema = z
  .string()
  .min(1, "Image URL is required")
  .refine(isValidImagePath, "Invalid image URL");
