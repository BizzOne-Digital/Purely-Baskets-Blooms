import Image from "next/image";
import Link from "next/link";
import { LotusMark } from "@/components/editorial/LotusMark";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface AboutOfferingCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
  icon?: LucideIcon;
  className?: string;
}

export function AboutOfferingCard({
  title,
  description,
  imageSrc,
  href,
  icon: Icon,
  className,
}: AboutOfferingCardProps) {
  const content = (
    <article className={cn("group", className)}>
      <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-blush/10 ring-1 ring-champagne/35">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute -bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full border border-champagne/50 bg-ivory shadow-md">
          {Icon ? (
            <Icon className="h-4 w-4 text-marigold" />
          ) : (
            <LotusMark size="sm" className="text-marigold" />
          )}
        </div>
      </div>
      <h3 className="font-display text-lg font-semibold text-deep-berry">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-deep-ink/60">{description}</p>
    </article>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
