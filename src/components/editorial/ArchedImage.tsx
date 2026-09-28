import Image from "next/image";
import { cn } from "@/lib/utils";

interface ArchedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  variant?: "arch" | "circle" | "rounded";
}

const variantClasses = {
  arch: "arch-mask",
  circle: "rounded-full",
  rounded: "rounded-3xl",
};

export function ArchedImage({
  src,
  alt,
  className,
  priority = false,
  variant = "arch",
}: ArchedImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden shadow-xl shadow-blush/20 ring-1 ring-champagne/40",
        variantClasses[variant],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="hero-arch-image brightness-[1.04] saturate-[1.05]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
