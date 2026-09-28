import Image from "next/image";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { EditorialBackdrop } from "@/components/editorial/EditorialBackdrop";
import { LotusMark } from "@/components/editorial/LotusMark";
import { ArchedImage } from "@/components/editorial/ArchedImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { cn } from "@/lib/utils";

type BackdropVariant = "default" | "warm" | "riwaaz" | "shop";
type EyebrowVariant = "berry" | "rose" | "marigold" | "coral" | "botanical" | "champagne";

interface SplitEditorialHeroProps {
  eyebrow?: string;
  eyebrowVariant?: EyebrowVariant;
  title: React.ReactNode;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  imageVariant?: "arch" | "circle" | "rounded";
  backdrop?: BackdropVariant;
  showLotus?: boolean;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
  fullBleedImage?: boolean;
}

export function SplitEditorialHero({
  eyebrow,
  eyebrowVariant = "rose",
  title,
  description,
  imageSrc,
  imageAlt,
  imageVariant = "arch",
  backdrop = "default",
  showLotus = false,
  align = "left",
  className,
  children,
  fullBleedImage = false,
}: SplitEditorialHeroProps) {
  return (
    <EditorialBackdrop variant={backdrop} className={cn("border-b border-champagne/25", className)}>
      <section className="relative mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll className={cn(align === "center" && "text-center lg:text-left")}>
            {showLotus ? (
              <LotusMark className="mb-4" />
            ) : null}
            {eyebrow ? <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow> : null}
            <DisplayHeading
              as="h1"
              size="page"
              italic
              className={cn("mt-3", align === "center" && "lg:mx-0")}
            >
              {title}
            </DisplayHeading>
            {description ? (
              <p className="mt-5 max-w-lg text-base leading-relaxed text-deep-ink/70 md:text-lg">
                {description}
              </p>
            ) : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            {fullBleedImage ? (
              <div className="relative min-h-[320px] overflow-hidden rounded-3xl shadow-2xl shadow-blush/25 md:min-h-[420px]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  className="hero-cover-image brightness-[1.05] saturate-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/20 via-transparent to-ivory/10" />
              </div>
            ) : (
              <ArchedImage
                src={imageSrc}
                alt={imageAlt}
                priority
                variant={imageVariant}
                className="mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
              />
            )}
          </RevealOnScroll>
        </div>
      </section>
    </EditorialBackdrop>
  );
}
