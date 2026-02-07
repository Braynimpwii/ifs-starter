import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-red text-white hover:bg-brand-red-dark shadow-lg hover:shadow-[0_0_40px_-10px_rgba(193,18,31,0.6)]",
        secondary:
          "bg-navy-900 text-white hover:bg-navy-800 shadow-md hover:shadow-lg",
        outline:
          "border-2 border-brand-red text-brand-red hover:bg-brand-red/5 hover:border-brand-red-dark",
        ghost:
          "text-brand-red hover:bg-brand-red/10 hover:text-brand-red-dark",
        muted:
          "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
        danger:
          "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-[0_0_30px_-10px_rgba(220,38,38,0.6)]",
        success:
          "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.6)]",
      },
      size: {
        xs: "h-8 px-2.5 text-xs gap-1.5",
        sm: "h-9 px-3 text-sm gap-1.5",
        md: "h-11 px-4 text-base gap-2",
        lg: "h-12 px-6 text-base gap-2",
        xl: "h-14 px-8 text-lg font-semibold gap-3",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
      },
      loading: {
        true: "pointer-events-none opacity-60",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      width: "auto",
      loading: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      width,
      loading,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,
            width,
            loading: isLoading || loading,
            className,
          })
        )}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }