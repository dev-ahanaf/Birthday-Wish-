import React, { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "solid" | "bordered" | "glowing";
}

export function Card({
  children,
  className,
  variant = "glass",
  ...props
}: CardProps) {
  const base = "rounded-2xl transition-all duration-300";

  const variants = {
    glass:
      "bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 text-slate-100",
    solid: "bg-slate-900 border border-slate-800 text-slate-100 shadow-xl",
    bordered: "bg-slate-950/80 border border-pink-500/20 text-slate-100",
    glowing:
      "bg-slate-900/80 border border-pink-500/40 shadow-[0_0_30px_rgba(244,63,94,0.15)] text-slate-100",
  };

  return (
    <div className={twMerge(clsx(base, variants[variant], className))} {...props}>
      {children}
    </div>
  );
}
