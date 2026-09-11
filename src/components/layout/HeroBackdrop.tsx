import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroBackdropProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

export function HeroBackdrop({
  src,
  alt,
  priority = false,
  className,
  imageClassName,
}: HeroBackdropProps) {
  const decorative = !alt;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden={decorative || undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          "hero-cover-image brightness-[0.88] saturate-[1.05]",
          imageClassName
        )}
        sizes="(max-width: 768px) 100vw, 100vw"
      />
      <div className="hero-scrim-cinematic" />
      <div className="hero-scrim-bottom" />
    </div>
  );
}
