import React, { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-200">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          onClick={(e) => {
            if (props.type === "date" && "showPicker" in e.currentTarget) {
              try {
                (e.currentTarget as HTMLInputElement).showPicker();
              } catch {
                // Ignore if showPicker isn't permitted by browser policy
              }
            }
            if (props.onClick) props.onClick(e);
          }}
          className={twMerge(
            clsx(
              "w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 text-sm cursor-pointer",
              error
                ? "border-rose-500 focus:ring-rose-500/50"
                : "border-slate-700/80 focus:border-pink-500 focus:ring-pink-500/30",
              className
            )
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-400 font-medium mt-1">{error}</p>}
        {helperText && !error && <p className="text-xs text-slate-400 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
