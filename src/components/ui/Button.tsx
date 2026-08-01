import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]";

    const variants = {
      primary:
        "bg-pink-600 text-white hover:bg-pink-500 shadow-lg shadow-pink-600/30 focus:ring-pink-500",
      secondary:
        "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 focus:ring-slate-500",
      outline:
        "border border-pink-500/40 text-pink-300 hover:bg-pink-500/10 focus:ring-pink-500",
      ghost:
        "text-slate-300 hover:text-white hover:bg-slate-800/60 focus:ring-slate-500",
      danger:
        "bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/30 focus:ring-rose-500",
      gradient:
        "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white hover:opacity-95 shadow-xl shadow-pink-500/25 border border-white/10 focus:ring-pink-400",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs font-medium gap-1.5",
      md: "px-4 py-2 text-sm font-semibold gap-2",
      lg: "px-6 py-3 text-base font-semibold gap-2.5",
      xl: "px-8 py-4 text-lg font-bold gap-3 rounded-2xl",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
