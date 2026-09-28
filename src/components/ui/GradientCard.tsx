import { cn } from "@/lib/utils";

type CardAccent = "rose" | "berry" | "coral" | "marigold" | "botanical" | "champagne";

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: CardAccent;
  hover?: boolean;
}

const accentClasses: Record<CardAccent, string> = {
  rose: "from-dusty-rose/40 via-blush/30 to-champagne/20",
  berry: "from-deep-berry/30 via-dusty-rose/20 to-blush/30",
  coral: "from-coral/35 via-blush/25 to-marigold/15",
  marigold: "from-marigold/35 via-champagne/30 to-blush/20",
  botanical: "from-botanical/25 via-champagne/20 to-blush/25",
  champagne: "from-champagne/40 via-blush/20 to-ivory",
};

export function GradientCard({
  children,
  className,
  accent = "rose",
  hover = true,
}: GradientCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-sm border border-gold/20 bg-carbon-elevated/95 p-6 backdrop-blur-md md:p-8",
        hover && "transition-all duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-xl hover:shadow-black/30",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80",
          accentClasses[accent]
        )}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}
