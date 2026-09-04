import Image from "next/image";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { cn } from "@/lib/utils";

interface ServiceAlternatingRowProps {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
  className?: string;
}

export function ServiceAlternatingRow({
  number,
  title,
  description,
  imageSrc,
  reverse = false,
  className,
}: ServiceAlternatingRowProps) {
  return (
    <RevealOnScroll className={cn("relative", className)}>
      <div
        className={cn(
          "grid items-center gap-8 md:grid-cols-2 md:gap-12",
          reverse && "md:[&>*:first-child]:order-2"
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-blush/15 ring-1 ring-champagne/30">
          <Image src={imageSrc} alt={title} fill className="object-cover" sizes="50vw" />
        </div>
        <div className={cn("relative", reverse ? "md:pr-8" : "md:pl-8")}>
          <span className="font-display text-5xl font-semibold text-champagne/70 md:text-6xl">
            {number}
          </span>
          <DisplayHeading as="h2" size="section" className="mt-2">
            {title}
          </DisplayHeading>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-deep-ink/65 md:text-base">
            {description}
          </p>
        </div>
      </div>
    </RevealOnScroll>
  );
}
