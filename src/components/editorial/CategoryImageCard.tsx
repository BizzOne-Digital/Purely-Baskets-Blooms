import Image from "next/image";
import Link from "next/link";
import { LotusMark } from "@/components/editorial/LotusMark";
import { cn } from "@/lib/utils";

interface CategoryImageCardProps {
  title: string;
  imageSrc: string;
  href?: string;
  className?: string;
}

export function CategoryImageCard({
  title,
  imageSrc,
  href,
  className,
}: CategoryImageCardProps) {
  const content = (
    <div
      className={cn(
        "group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg shadow-blush/15 ring-1 ring-champagne/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blush/25",
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-plum/75 via-plum/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-center">
        <LotusMark size="sm" className="mx-auto mb-2 text-champagne" />
        <h3 className="font-display text-lg font-semibold text-ivory md:text-xl">{title}</h3>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
