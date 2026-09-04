import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sale" | "new" | "bestseller" | "madeToOrder" | "riwaaz" | "outline";
  className?: string;
}

const variantStyles = {
  default: "bg-blush/60 text-deep-berry",
  sale: "bg-coral/20 text-coral",
  new: "bg-dusty-rose/20 text-deep-berry border border-dusty-rose/25",
  bestseller: "bg-deep-berry text-ivory",
  madeToOrder: "bg-ivory/95 text-deep-berry border border-champagne/60",
  riwaaz: "bg-marigold/20 text-plum",
  outline: "border border-champagne/60 bg-ivory/50 text-deep-ink/70",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
