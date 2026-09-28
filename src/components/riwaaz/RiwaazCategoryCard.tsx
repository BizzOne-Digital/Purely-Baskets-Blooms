import Image from "next/image";
import Link from "next/link";
import { LotusMark } from "@/components/editorial/LotusMark";
import { cn } from "@/lib/utils";

interface RiwaazCategoryCardProps {
  title: string;
  imageSrc: string;
  href?: string;
  className?: string;
}

export function RiwaazCategoryCard({
  title,
  imageSrc,
  href,
  className,
}: RiwaazCategoryCardProps) {
  const imageBlock = (
    <div className="flower-surface overflow-hidden rounded-sm border border-gold/25 shadow-lg shadow-black/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-black/40">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover brightness-[1.1] saturate-[1.1] transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  );

  return (
    <div className={cn("group text-center", className)}>
      {href ? (
        <Link href={href} className="block">
          {imageBlock}
        </Link>
      ) : (
        imageBlock
      )}
      <h3 className="mt-4 font-display text-lg font-semibold text-cream md:text-xl">
        {href ? (
          <Link href={href} className="transition-colors hover:text-gold-light">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <LotusMark size="sm" className="mx-auto mt-2 text-champagne" />
    </div>
  );
}
