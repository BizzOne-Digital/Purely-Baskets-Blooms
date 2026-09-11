import { cn } from "@/lib/utils";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "relative",
        isCenter ? "mx-auto max-w-2xl text-center" : "max-w-xl text-left",
        className
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-bold uppercase tracking-[0.28em] text-gold",
            isCenter && "mx-auto"
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <DisplayHeading as="h2" size="section" className={isCenter ? "mx-auto" : undefined}>
        {title}
      </DisplayHeading>

      <div
        className={cn(
          "mt-4 h-px w-24 bg-gradient-to-r from-gold via-coral/60 to-transparent",
          isCenter ? "mx-auto" : undefined
        )}
        aria-hidden
      />

      {description ? (
        <p className="mt-5 text-sm leading-relaxed text-cream/65 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
