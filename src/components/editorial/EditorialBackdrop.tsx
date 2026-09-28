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
    <div className={cn("relative isolate w-full max-w-full overflow-hidden", className)}>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br",
          variantClasses[variant]
        )}
        aria-hidden
      />
      <div
        className="editorial-botanical-lines pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />
      <div
        className="editorial-fabric-swash pointer-events-none absolute right-0 top-0 hidden h-[min(420px,70vw)] w-[min(420px,70vw)] translate-x-1/3 opacity-60 sm:block"
        aria-hidden
      />
      <div
        className="editorial-fabric-swash pointer-events-none absolute bottom-0 left-0 hidden h-[min(360px,65vw)] w-[min(360px,65vw)] -translate-x-1/4 translate-y-1/4 rotate-180 opacity-50 sm:block"
        aria-hidden
      />
      <div className="relative min-w-0 max-w-full">{children}</div>
    </div>
  );
}
