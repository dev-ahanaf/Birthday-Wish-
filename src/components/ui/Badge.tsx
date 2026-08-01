import React, { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "pink" | "purple" | "amber" | "emerald" | "cyan" | "slate";
}

export function Badge({
  children,
  className,
  variant = "pink",
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-all border";

  const variants = {
    pink: "bg-pink-500/10 text-pink-300 border-pink-500/30",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    slate: "bg-slate-800/80 text-slate-300 border-slate-700",
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], className))} {...props}>
      {children}
    </span>
  );
}
