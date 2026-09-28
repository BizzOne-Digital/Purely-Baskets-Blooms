import Image from "next/image";
import type { SerializedGalleryItem } from "@/lib/storefront";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PageSection } from "@/components/layout/PageSection";
import { GradientMesh } from "@/components/animations/GradientMesh";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface GallerySectionProps {
  items: SerializedGalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  if (items.length === 0) return null;

  return (
    <PageSection tone="subtle" className="relative py-20 md:py-28">
      <GradientMesh variant="subtle" className="opacity-40" />
      <RevealOnScroll className="relative mb-12 text-center">
        <Eyebrow>Portfolio</Eyebrow>
        <DisplayHeading as="h2" size="section" className="mt-3">
          Our Gallery
        </DisplayHeading>
      </RevealOnScroll>

      <div className="relative columns-2 gap-4 md:columns-3 md:gap-6">
        {items.map((item, i) => (
          <RevealOnScroll key={item._id} delay={(i % 3) * 0.1} className="mb-4 break-inside-avoid md:mb-6">
            <div className="group relative overflow-hidden rounded-2xl">
              <div
                className="relative w-full"
                style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/3" : "1/1" }}
              >
                <Image
                  src={item.image.url}
                  alt={item.image.alt ?? item.title ?? "Gallery"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-deep-berry/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              {item.title || item.caption ? (
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.title ? (
                    <p className="text-sm font-medium text-ivory">{item.title}</p>
                  ) : null}
                  {item.caption ? (
                    <p className="text-xs text-ivory/70">{item.caption}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </PageSection>
  );
}
