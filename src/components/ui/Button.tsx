"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-deep-berry text-pure-white hover:bg-plum shadow-md shadow-deep-berry/15",
  secondary:
    "bg-transparent border border-deep-berry/35 text-deep-berry hover:bg-blush/50",
  ghost: "bg-transparent text-deep-ink hover:bg-carbon-elevated",
  coral: "bg-dusty-rose text-pure-white hover:bg-dusty-rose/90 shadow-md",
  outline:
    "border border-deep-berry/40 bg-transparent text-deep-berry hover:border-deep-berry hover:bg-blush/40",
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
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-berry focus-visible:ring-offset-2 focus-visible:ring-offset-pure-white",
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
