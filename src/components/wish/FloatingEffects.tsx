"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { EffectType } from "@/lib/types";

interface FloatingEffectsProps {
  effects: EffectType[];
  confettiEnabled: boolean;
  triggerPop: boolean;
}

export function FloatingEffects({ effects, confettiEnabled, triggerPop }: FloatingEffectsProps) {
  useEffect(() => {
    if (triggerPop && confettiEnabled) {
      // Fire confetti burst
      const duration = 3.5 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff4d6d", "#7928ca", "#00dfd8", "#fbbf24"],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff4d6d", "#7928ca", "#00dfd8", "#fbbf24"],
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [triggerPop, confettiEnabled]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Balloons effect */}
      {effects.includes("balloons") && (
        <div className="absolute inset-0">
          <div className="absolute left-[10%] bottom-[-50px] text-4xl animate-float-slow opacity-80">🎈</div>
          <div className="absolute left-[30%] bottom-[-50px] text-5xl animate-float-slow delay-1000 opacity-90">🎈</div>
          <div className="absolute right-[25%] bottom-[-50px] text-4xl animate-float-slow delay-2000 opacity-80">🎈</div>
          <div className="absolute right-[10%] bottom-[-50px] text-5xl animate-float-slow delay-3000 opacity-90">🎈</div>
        </div>
      )}

      {/* Floating Hearts effect */}
      {effects.includes("hearts") && (
        <div className="absolute inset-0">
          <div className="absolute left-[15%] top-[20%] text-3xl animate-pulse-glow opacity-70">💖</div>
          <div className="absolute right-[15%] top-[30%] text-4xl animate-pulse-glow delay-1000 opacity-80">💕</div>
          <div className="absolute left-[45%] top-[10%] text-3xl animate-bounce-gentle opacity-75">💗</div>
        </div>
      )}

      {/* Night Stars effect */}
      {effects.includes("stars") && (
        <div className="absolute inset-0">
          <div className="absolute left-[5%] top-[15%] text-2xl animate-pulse text-amber-300">✨</div>
          <div className="absolute right-[8%] top-[25%] text-3xl animate-pulse delay-500 text-amber-200">✨</div>
          <div className="absolute left-[50%] top-[5%] text-2xl animate-pulse delay-1000 text-amber-300">⭐</div>
        </div>
      )}

      {/* Fireworks / Flowers */}
      {effects.includes("fireworks") && (
        <div className="absolute inset-0">
          <div className="absolute left-[20%] top-[40%] text-3xl animate-bounce-gentle text-cyan-300">🎆</div>
          <div className="absolute right-[20%] top-[50%] text-4xl animate-bounce-gentle delay-700 text-fuchsia-300">🎆</div>
        </div>
      )}

      {effects.includes("flowers") && (
        <div className="absolute inset-0">
          <div className="absolute left-[12%] bottom-[20%] text-3xl animate-float-slow opacity-80">🌸</div>
          <div className="absolute right-[12%] bottom-[30%] text-4xl animate-float-slow delay-1000 opacity-80">🌺</div>
        </div>
      )}
    </div>
  );
}
