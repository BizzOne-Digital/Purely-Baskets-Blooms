import { cn } from "@/lib/utils";

interface CrownMarkProps {
  className?: string;
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "h-4 w-5",
  md: "h-5 w-6",
};

export function CrownMark({ className, size = "md" }: CrownMarkProps) {
  return (
    <svg
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-marigold", sizeClasses[size], className)}
      aria-hidden
    >
      <path
        d="M2 16h20v2H2v-2ZM4 14l2.5-9 3.5 5 4-7 4 7 3.5-5L20 14H4Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="6.5" cy="6" r="1" fill="currentColor" />
      <circle cx="12" cy="4" r="1" fill="currentColor" />
      <circle cx="17.5" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}
