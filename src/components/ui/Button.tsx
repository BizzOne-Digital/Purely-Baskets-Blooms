"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-deep-berry text-ivory hover:bg-plum shadow-lg shadow-deep-berry/20",
  secondary:
    "bg-transparent border border-deep-berry/30 text-deep-berry hover:bg-blush/40",
  ghost: "bg-transparent text-deep-ink hover:bg-blush/30",
  coral: "bg-coral text-ivory hover:bg-coral/90 shadow-md shadow-coral/25",
  outline:
    "border border-champagne/60 bg-ivory/50 text-deep-ink hover:border-dusty-rose hover:bg-blush/20 backdrop-blur-sm",
};

const sizes = {
  sm: "h-9 px-4 text-xs tracking-wide",
  md: "h-11 px-6 text-sm tracking-wide",
  lg: "h-13 px-8 text-sm tracking-widest uppercase",
  icon: "h-10 w-10",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

type MotionButtonProps = HTMLMotionProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium transition-colors duration-300",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
);
MotionButton.displayName = "MotionButton";

export { Button };
