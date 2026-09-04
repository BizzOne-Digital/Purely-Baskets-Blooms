"use client";

import { cn } from "@/lib/utils";

type BlobVariant = "hero" | "subtle" | "warm" | "berry" | "plum" | "riwaaz" | "coral" | "botanical" | "shop";

interface DecorativeBlobsProps {
  variant?: BlobVariant;
  className?: string;
}

const blobSets: Record<BlobVariant, Array<{ className: string }>> = {
  hero: [
    { className: "left-[5%] top-[10%] h-48 w-48 bg-dusty-rose/25" },
    { className: "right-[10%] top-[20%] h-64 w-64 bg-marigold/20" },
    { className: "bottom-[15%] left-[30%] h-40 w-40 bg-coral/15" },
  ],
  subtle: [
    { className: "right-[8%] top-[15%] h-40 w-40 bg-blush/30" },
    { className: "bottom-[10%] left-[12%] h-52 w-52 bg-champagne/25" },
  ],
  warm: [
    { className: "left-[8%] top-[12%] h-56 w-56 bg-coral/20" },
    { className: "right-[5%] bottom-[8%] h-44 w-44 bg-marigold/25" },
  ],
  berry: [
    { className: "left-[10%] top-[8%] h-52 w-52 bg-deep-berry/15" },
    { className: "right-[12%] bottom-[12%] h-48 w-48 bg-dusty-rose/20" },
  ],
  plum: [
    { className: "right-[8%] top-[10%] h-60 w-60 bg-plum/20" },
    { className: "left-[15%] bottom-[5%] h-40 w-40 bg-deep-berry/15" },
  ],
  riwaaz: [
    { className: "left-[5%] top-[15%] h-56 w-56 bg-marigold/30" },
    { className: "right-[8%] bottom-[10%] h-48 w-48 bg-deep-berry/20" },
  ],
  coral: [
    { className: "right-[10%] top-[12%] h-52 w-52 bg-coral/25" },
    { className: "left-[8%] bottom-[15%] h-44 w-44 bg-blush/30" },
  ],
  botanical: [
    { className: "left-[12%] top-[10%] h-48 w-48 bg-botanical/20" },
    { className: "right-[10%] bottom-[8%] h-56 w-56 bg-champagne/25" },
  ],
  shop: [
    { className: "right-[6%] top-[8%] h-64 w-64 bg-blush/25" },
    { className: "left-[10%] bottom-[12%] h-40 w-40 bg-dusty-rose/15" },
  ],
};

export function DecorativeBlobs({ variant = "hero", className }: DecorativeBlobsProps) {
  const blobs = blobSets[variant] ?? blobSets.hero;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={cn("absolute rounded-full blur-3xl", blob.className)}
        />
      ))}
    </div>
  );
}
