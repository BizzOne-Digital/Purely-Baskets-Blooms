import { cn } from "@/lib/utils";

type EyebrowVariant =
  | "berry"
  | "rose"
  | "marigold"
  | "coral"
  | "botanical"
  | "champagne";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  variant?: EyebrowVariant;
}

const variantClasses: Record<EyebrowVariant, string> = {
  berry: "text-deep-berry",
  rose: "text-dusty-rose",
  marigold: "text-marigold",
  coral: "text-coral",
  botanical: "text-botanical",
  champagne: "text-champagne",
};

export function Eyebrow({
  children,
  className,
  variant = "rose",
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-bold uppercase tracking-[0.26em] sm:text-sm",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </p>
  );
}
