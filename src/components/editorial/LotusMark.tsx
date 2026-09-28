import { cn } from "@/lib/utils";

interface LotusMarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
  lg: "h-9 w-9",
};

export function LotusMark({ className, size = "md" }: LotusMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-marigold", sizeClasses[size], className)}
      aria-hidden
    >
      <path
        d="M16 4C14 8 12 10 8 11C12 12 14 14 16 18C18 14 20 12 24 11C20 10 18 8 16 4Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M16 18C13 20 10 22 6 22C10 24 13 26 16 28C19 26 22 24 26 22C22 22 19 20 16 18Z"
        fill="currentColor"
        opacity="0.65"
      />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}
