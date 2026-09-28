import Link from "next/link";
import { LotusMark } from "@/components/editorial/LotusMark";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface AboutOfferingCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  href?: string;
  icon?: LucideIcon;
  className?: string;
}

export function AboutOfferingCard({
  title,
  description,
  href,
  icon: Icon,
  className,
}: AboutOfferingCardProps) {
  const content = (
    <article
      className={cn(
        "group rounded-2xl border border-deep-ink/10 bg-pure-white p-6 shadow-sm transition-colors hover:border-deep-berry/25 hover:bg-ivory/80",
        className
      )}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-champagne/50 bg-ivory">
        {Icon ? (
          <Icon className="h-4 w-4 text-deep-berry" />
        ) : (
          <LotusMark size="sm" className="text-deep-berry" />
        )}
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
