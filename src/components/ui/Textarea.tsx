import React, { TextareaHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  currentLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helperText, maxLength, currentLength, className, id, ...props },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        <div className="flex justify-between items-center">
          {label && (
            <label htmlFor={inputId} className="block text-sm font-medium text-slate-200">
              {label}
            </label>
          )}
          {maxLength !== undefined && currentLength !== undefined && (
            <span
              className={clsx(
                "text-xs font-mono font-medium",
                currentLength > maxLength ? "text-rose-400" : "text-slate-400"
              )}
            >
              {currentLength} / {maxLength}
            </span>
          )}
        </div>
        <textarea
          id={inputId}
          ref={ref}
          className={twMerge(
            clsx(
              "w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 text-sm min-h-[120px] resize-y",
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

Textarea.displayName = "Textarea";
