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
  plain: "bg-pure-white",
  subtle: "bg-ivory",
  warm: "bg-cream",
  blush: "bg-blush/35",
  berry: "bg-ivory",
  plum: "bg-pure-white",
};

export function PageSection({
  children,
  tone = "plain",
  className,
  containerClassName,
  fullWidth = false,
  id,
}: PageSectionProps) {
  const hasMesh = false;

  return (
    <section
      id={id}
      className={cn("relative w-full max-w-full overflow-hidden", toneClasses[tone], className)}
    >
      {hasMesh ? <GradientMesh variant={tone === "berry" || tone === "plum" ? "berry" : "subtle"} className="opacity-60" /> : null}
      <div
        className={cn(
          "relative min-w-0 w-full max-w-full",
          !fullWidth && "mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
