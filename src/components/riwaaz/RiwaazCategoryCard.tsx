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
    <div className="overflow-hidden rounded-2xl border border-champagne/75 bg-ivory shadow-md shadow-blush/10 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-blush/15">
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
      <h3 className="mt-4 font-display text-lg font-semibold text-deep-berry md:text-xl">
        {href ? (
          <Link href={href} className="transition-colors hover:text-plum">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <LotusMark size="sm" className="mx-auto mt-2 text-marigold" />
    </div>
  );
}
