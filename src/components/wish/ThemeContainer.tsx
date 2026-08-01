import React, { ReactNode } from "react";
import { THEMES } from "@/lib/themes";
import { ThemeId } from "@/lib/types";

interface ThemeContainerProps {
  themeId: ThemeId;
  children: ReactNode;
}

export function ThemeContainer({ themeId, children }: ThemeContainerProps) {
  const theme = THEMES[themeId] || THEMES.romantic;

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b ${theme.bgGradient} ${theme.textColor} ${theme.fontFamily} relative overflow-x-hidden transition-colors duration-700`}>
      {/* Background Subtle Animated Orbs */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-500/10 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
