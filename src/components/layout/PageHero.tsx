import { GradientMesh } from "@/components/animations/GradientMesh";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { DecorativeBlobs } from "@/components/animations/DecorativeBlobs";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type GradientVariant =
  | "hero"
  | "subtle"
  | "warm"
  | "berry"
  | "plum"
  | "riwaaz"
  | "coral"
  | "botanical"
  | "shop";

type EyebrowVariant =
  | "berry"
  | "rose"
  | "marigold"
  | "coral"
  | "botanical"
  | "champagne";

interface PageHeroProps {
  eyebrow: string;
  eyebrowVariant?: EyebrowVariant;
  title: React.ReactNode;
  description?: string;
  gradient?: GradientVariant;
  align?: "left" | "center";
  italic?: boolean;
  size?: "page" | "section";
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  eyebrowVariant = "rose",
  title,
  description,
  gradient = "hero",
  align = "center",
  italic = false,
  size = "page",
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-champagne/25 py-16 md:py-24",
        className
      )}
    >
      <GradientMesh variant={gradient} />
      <DecorativeBlobs variant={gradient} />
      <div
        className={cn(
          "relative mx-auto max-w-7xl px-4 md:px-8",
          align === "center" ? "text-center" : "text-left"
        )}
      >
        <RevealOnScroll>
          <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>
          <DisplayHeading
            as="h1"
            size={size}
            italic={italic}
            className={cn("mt-3", align === "center" && "mx-auto")}
          >
            {title}
          </DisplayHeading>
          {description ? (
            <p
              className={cn(
                "mt-5 max-w-2xl text-base leading-relaxed text-deep-ink/70 md:text-lg",
                align === "center" && "mx-auto"
              )}
            >
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </RevealOnScroll>
      </div>
    </section>
  );
}
