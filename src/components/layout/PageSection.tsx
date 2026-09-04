import { GradientMesh } from "@/components/animations/GradientMesh";
import { cn } from "@/lib/utils";

type SectionTone = "plain" | "subtle" | "warm" | "blush" | "berry" | "plum";

interface PageSectionProps {
  children: React.ReactNode;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
  id?: string;
}

const toneClasses: Record<SectionTone, string> = {
  plain: "bg-ivory",
  subtle: "bg-gradient-to-b from-ivory via-blush/15 to-ivory",
  warm: "bg-gradient-to-br from-ivory via-champagne/20 to-blush/25",
  blush: "bg-gradient-to-b from-blush/25 via-ivory to-blush/10",
  berry: "bg-gradient-to-br from-plum/5 via-blush/20 to-ivory",
  plum: "bg-gradient-to-b from-plum/8 via-ivory to-blush/15",
};

export function PageSection({
  children,
  tone = "plain",
  className,
  containerClassName,
  fullWidth = false,
  id,
}: PageSectionProps) {
  const hasMesh = tone !== "plain";

  return (
    <section id={id} className={cn("relative overflow-hidden", toneClasses[tone], className)}>
      {hasMesh ? <GradientMesh variant={tone === "berry" || tone === "plum" ? "berry" : "subtle"} className="opacity-60" /> : null}
      <div
        className={cn(
          "relative",
          !fullWidth && "mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
