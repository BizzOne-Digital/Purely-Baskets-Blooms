import { cn } from "@/lib/utils";

type DisplayHeadingLevel = "h1" | "h2" | "h3";
type DisplayHeadingSize = "page" | "section" | "card";

interface DisplayHeadingProps {
  children: React.ReactNode;
  as?: DisplayHeadingLevel;
  size?: DisplayHeadingSize;
  className?: string;
  italic?: boolean;
}

const sizeClasses: Record<DisplayHeadingSize, string> = {
  page: "text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.08]",
  section: "text-3xl md:text-4xl leading-tight",
  card: "text-xl md:text-2xl leading-snug",
};

export function DisplayHeading({
  children,
  as: Tag = "h2",
  size = "section",
  className,
  italic = false,
}: DisplayHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display font-semibold text-neutral-950 break-words",
        italic && "italic",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}
