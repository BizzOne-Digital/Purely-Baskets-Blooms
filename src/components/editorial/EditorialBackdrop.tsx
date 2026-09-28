import { cn } from "@/lib/utils";

interface EditorialBackdropProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "warm" | "riwaaz" | "shop";
}

const variantClasses = {
  default: "from-blush/20 via-ivory to-champagne/15",
  warm: "from-coral/10 via-blush/25 to-ivory",
  riwaaz: "from-marigold/15 via-blush/20 to-ivory",
  shop: "from-blush/15 via-ivory to-champagne/10",
};

export function EditorialBackdrop({
  children,
  className,
  variant = "default",
}: EditorialBackdropProps) {
  return (
    <div className={cn("relative w-full max-w-full overflow-x-clip", className)}>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br",
          variantClasses[variant]
        )}
        aria-hidden
      />
      <div className="editorial-botanical-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="editorial-fabric-swash pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] opacity-60" aria-hidden />
      <div className="editorial-fabric-swash pointer-events-none absolute -bottom-32 -left-20 h-[360px] w-[360px] rotate-180 opacity-50" aria-hidden />
      <div className="relative">{children}</div>
    </div>
  );
}
