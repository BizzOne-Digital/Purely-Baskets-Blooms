import Image from "next/image";
import { LotusMark } from "@/components/editorial/LotusMark";
import { cn } from "@/lib/utils";

interface EventCategoryCardProps {
  title: string;
  imageSrc: string;
  className?: string;
}

export function EventCategoryCard({ title, imageSrc, className }: EventCategoryCardProps) {
  return (
    <div
      className={cn(
        "group relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg shadow-blush/15 ring-1 ring-champagne/30 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blush/25 sm:aspect-[5/3]",
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-plum/15 to-plum/5" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <LotusMark size="sm" className="mb-2 text-champagne" />
        <h3 className="font-display text-xl font-semibold text-ivory md:text-2xl">{title}</h3>
      </div>
    </div>
  );
}
