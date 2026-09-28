import { LotusMark } from "@/components/editorial/LotusMark";
import { cn } from "@/lib/utils";

interface GoldFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function GoldFrame({ children, className }: GoldFrameProps) {
  return (
    <div className={cn("gold-frame relative rounded-3xl bg-ivory/90 p-6 shadow-xl shadow-blush/10 backdrop-blur-sm md:p-8", className)}>
      <LotusMark className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory p-1" />
      {children}
    </div>
  );
}
