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
  showWave?: boolean;
}

function ServiceWave({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 48"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none my-6 h-10 w-full text-gold/15 md:my-10 md:h-14",
        flip && "rotate-180"
      )}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,24 C200,48 400,0 600,24 C800,48 1000,0 1200,24 L1200,48 L0,48 Z"
      />
    </svg>
  );
}

export function ServiceAlternatingRow({
  number,
  title,
  description,
  imageSrc,
  reverse = false,
  className,
  showWave = true,
}: ServiceAlternatingRowProps) {
  return (
    <div className={cn("relative", className)}>
      {showWave ? <ServiceWave flip={reverse} /> : null}
      <RevealOnScroll>
        <div
          className={cn(
            "grid items-center gap-8 md:grid-cols-2 md:gap-14",
            reverse && "md:[&>*:first-child]:order-2"
          )}
        >
          <div className="flower-surface relative aspect-[4/3] overflow-hidden rounded-sm shadow-xl shadow-black/40 ring-1 ring-gold/25">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={cn("relative min-w-0 px-1", reverse ? "md:pr-6" : "md:pl-6")}>
            <span className="font-display text-5xl font-semibold leading-none text-gold/40 md:text-7xl">
              {number}
            </span>
            <DisplayHeading as="h2" size="section" className="mt-3 text-cream">
              {title}
            </DisplayHeading>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/72 md:text-base">
              {description}
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
